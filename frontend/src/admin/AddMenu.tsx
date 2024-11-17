import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";


const AddMenu = () => {
    const [input, setInput] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<any>();
    // const loading: boolean = false;


    const { loading, createMenu, deleteMenu } = useMenuStore();
    const { restaurant } = useRestaurantStore();

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === "number" ? Number(value) : value });
    };

    const [error, setError] = useState<Partial<MenuFormSchema>>({});

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(input);

        const result = menuSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<MenuFormSchema>);
            return;
        }

        // api
        try {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());
            if (input.image) {
                formData.append("image", input.image);
            }
            await createMenu(formData);
        }
        catch (error) {
            console.log(error);
        }

        setOpen(false);

    }

    // const menuItems: MenuFormSchema[] = [
    //     {
    //         name: "Biryani",
    //         description: "lorem gyrfudiosk vyfuhidjs ygfeijds",
    //         price: 69,
    //         image: undefined,
    //     },
    //     {
    //         name: "Momos",
    //         description: "lorem gyrfudiosk vyfuhidjs ygfeijds",
    //         price: 69,
    //         image: undefined,
    //     },
    //     {
    //         name: "Paneer",
    //         description: "lorem gyrfudiosk vyfuhidjs ygfeijds",
    //         price: 69,
    //         image: undefined,
    //     },
    // ]

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between mx-2">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
                    My Menu
                </h1>
                <div className="">
                    {
                        restaurant && (
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                    <Button className="bg-green hover:bg-hoverGreen dark:text-white">
                                        <Plus className="mr-2" />
                                        Add Item
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add A New Item</DialogTitle>
                                        <DialogDescription>
                                            Design a menu that will make your restaurant unforgettable.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={submitHandler} className="space-y-4">
                                        <div>
                                            <Label>Name</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={input.name}
                                                onChange={changeEventHandler}
                                                placeholder="Enter item name"
                                            />
                                            {error && (
                                                <span className="text-xs font-medium text-red-600">
                                                    {error.name}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Input
                                                type="text"
                                                name="description"
                                                value={input.description}
                                                onChange={changeEventHandler}
                                                placeholder="Enter item description"
                                            />
                                            {error && (
                                                <span className="text-xs font-medium text-red-600">
                                                    {error.description}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <Label>Price</Label>
                                            <Input
                                                type="number"
                                                name="price"
                                                value={input.price}
                                                onChange={changeEventHandler}
                                                placeholder="Enter item price"
                                            />
                                            {error && (
                                                <span className="text-xs font-medium text-red-600">
                                                    {error.price}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <Label>Upload Menu Image</Label>
                                            <Input
                                                type="file"
                                                name="image"
                                                onChange={(e) =>
                                                    setInput({
                                                        ...input,
                                                        image: e.target.files?.[0] || undefined,
                                                    })
                                                }
                                            />
                                            {error && (
                                                <span className="text-xs font-medium text-red-600">
                                                    {error.image?.name}
                                                </span>
                                            )}
                                        </div>
                                        <DialogFooter className="mt-5">
                                            {loading ? (
                                                <Button disabled className="w-full bg-green hover:bg-hoverGreen dark:text-white">
                                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                                    Please wait
                                                </Button>
                                            ) : (
                                                <Button className="w-full bg-green hover:bg-hoverGreen dark:text-white">
                                                    Submit
                                                </Button>
                                            )}
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )
                    }
                </div>

            </div>
            {restaurant?.menus.map((menu: any, idx: number) => (
                <div key={idx} className="mt-6 space-y-4 hover:shadow-lg">
                    <div className="relative flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
                        <img
                            src={menu.image}
                            alt={menu.name}
                            className="md:h-24 md:w-24 h-28 w-full object-contain rounded-lg"
                        />

                        <div onClick={() => deleteMenu(menu._id)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-1.5 cursor-pointer text-xs text-white">
                            <Trash2 className="w-4 h-4" />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {menu.name}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">{menu.description}</p>
                            <h2 className="text-md font-semibold mt-2 flex items-center">
                                Price: <span className="text-green dark:text-yellow-100 flex items-center mx-2">₹{menu.price}</span>
                            </h2>
                        </div>
                        <Button
                            onClick={() => {
                                setSelectedMenu(menu);
                                setEditOpen(true);
                            }}
                            size={"sm"}
                            className="bg-green hover:bg-hoverGreen mt-2 dark:text-white"
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            ))}
            {
                (restaurant?.menus.length === 0) && (
                    <div className="text-sm text-gray-600 text-center my-10">
                        No Items to display.
                    </div>
                )
            }
            <EditMenu
                selectedMenu={selectedMenu}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
            />
        </div>
    )
}

export default AddMenu