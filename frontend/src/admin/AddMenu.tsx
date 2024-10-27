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
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";


const AddMenu = () => {
    const [input, setInput] = useState({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<any>();
    const loading: boolean = false;

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === "number" ? Number(value) : value });
    };

    const submitHandler = () => {

    }

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
                    My Menu
                </h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button className="bg-green hover:bg-hoverGreen">
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
                                {/* {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.name}
                                    </span>
                                )} */}
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
                                {/* {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.description}
                                    </span>
                                )} */}
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
                                {/* {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.price}
                                    </span>
                                )} */}
                            </div>
                            <div>
                                <Label>Upload Menu Image</Label>
                                <Input
                                    type="file"
                                    name="image"
                                // onChange={(e) =>
                                //     setInput({
                                //         ...input,
                                //         image: e.target.files?.[0] || undefined,
                                //     })
                                // }
                                />
                                {/* {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.image?.name}
                                    </span>
                                )} */}
                            </div>
                            <DialogFooter className="mt-5">
                                {loading ? (
                                    <Button disabled className="bg-green hover:bg-hoverGreen">
                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button className="bg-green hover:bg-hoverGreen">
                                        Submit
                                    </Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {["momos", 'biryani', "paneer"].map((menu: string, idx: number) => (
                <div key={idx} className="mt-6 space-y-4 hover:shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
                        <img
                            src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg"
                            alt="Item Image"
                            className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h1 className="text-lg font-semibold text-gray-800">
                                {menu}
                            </h1>
                            <p className="text-sm tex-gray-600 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, culpa!</p>
                            <h2 className="text-md font-semibold mt-2">
                                Price: <span className="text-green">80</span>
                            </h2>
                        </div>
                        <Button
                            onClick={() => {
                                setSelectedMenu(menu);
                                setEditOpen(true);
                            }}
                            size={"sm"}
                            className="bg-green hover:bg-hoverGreen mt-2"
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            ))}
            {/* <EditMenu
                selectedMenu={selectedMenu}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
            /> */}
        </div>
    )
}

export default AddMenu