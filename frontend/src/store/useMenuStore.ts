import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

// const API_END_POINT = "https://feasto-3uh7.onrender.com/api/menu";
const API_END_POINT = "http://localhost:3000/api/menu";
axios.defaults.withCredentials = true;

type Menu = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

type MenuState = {
    loading: boolean,
    menu: null,
    allMenus: Menu[] | null,
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>;
    deleteMenu: (id: string) => Promise<void>;
}

export const useMenuStore = create<MenuState>()(persist((set) => ({
    loading: false,
    menu: null,
    allMenus: null,
    createMenu: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            // update restaurant 
            useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    editMenu: async (menuId: string, formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            // update restaurant menu
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    deleteMenu: async (id: string) => {
        try {
            set({ loading: true });
            const response = await axios.delete(`${API_END_POINT}/delete/${id}`);

            if (response.data.success) {
                toast.success(response.data.message);

                set((state) => ({
                    loading: false,
                    allMenus: state.allMenus ? state.allMenus.filter(menu => menu._id !== id) : null,
                }));

                useRestaurantStore.getState().removeMenuFromRestaurant(id);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        } finally {
            set({ loading: false });
        }
    },
}), {
    name: "menu-name",
    storage: createJSONStorage(() => localStorage)
}))