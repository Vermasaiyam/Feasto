import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";
import { MenuState } from "@/types/menuType";

// const API_END_POINT = "https://feasto-3uh7.onrender.com/api/menu";

const API_END_POINT = import.meta.env.VITE_API_END_POINT_MENU || "https://feasto-3uh7.onrender.com/api/menu";
const END_POINT = import.meta.env.VITE_END_POINT || "https://feasto-3uh7.onrender.com/api"; 

axios.defaults.withCredentials = true;


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
        } finally {
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
        } finally {
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
    fetchAllMenus: async () => {
        try {
            set({ loading: true });
            // console.log("start");

            const response = await axios.get(`${END_POINT}/menus`);

            if (response.data.success) {
                set({ loading: false, allMenus: response.data.menu });
            }
        } catch (error: any) {
            console.log("Error", error);
            if (error.response && error.response.status === 404) {
                set({ allMenus: null });
            }
            set({ loading: false });
        } finally {
            set({ loading: false });
        }
    }
}), {
    name: "menu-name",
    storage: createJSONStorage(() => localStorage)
}))