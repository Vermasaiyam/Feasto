export type Menu = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export type MenuState = {
    loading: boolean,
    menu: null,
    allMenus: Menu[] | null,
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>;
    deleteMenu: (id: string) => Promise<void>;
    fetchAllMenus: () => Promise<void>;
}