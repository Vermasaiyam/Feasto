import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { useState } from "react";

const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button variant="link">Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-darkGreen text-lg">Items</TableHead>
                        <TableHead className="text-darkGreen text-lg">Title</TableHead>
                        <TableHead className="text-darkGreen text-lg">Price</TableHead>
                        <TableHead className="text-darkGreen text-lg">Quantity</TableHead>
                        <TableHead className="text-darkGreen text-lg">Total</TableHead>
                        <TableHead className="text-right text-darkGreen text-lg">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {["biryani", "momos", "noodles"].map((item: string) => (
                        <TableRow>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src="" alt="" />
                                    <AvatarFallback>SV</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell> {item}</TableCell>
                            <TableCell> 500</TableCell>
                            <TableCell>
                                <div className="flex items-center rounded-full">
                                    <Button
                                        // onClick={() => decrementQuantity(item._id)}
                                        size={"icon"}
                                        variant={"outline"}
                                        className="rounded-full bg-green hover:bg-hoverGreen text-white hover:text-white"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        // size={"icon"}
                                        className="font-bold border-none"
                                        disabled
                                        variant={"outline"}
                                    >
                                        {/* {item.quantity} */}
                                        2
                                    </Button>
                                    <Button
                                        // onClick={() => incrementQuantity(item._id)}
                                        size={"icon"}
                                        className="rounded-full bg-green hover:bg-hoverGreen text-white hover:text-white"
                                        variant={"outline"}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>
                                {/* {item.price * item.quantity} */}
                                {500 * 2}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size={"sm"} variant={"outline"} className="hover:text-white text-green border border-green hover:bg-green">
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="text-2xl font-bold">
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">
                            {/* ₹{totalAmount} */}
                            ₹5000
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-green hover:bg-hoverGreen"
                >
                    Proceed To Checkout
                </Button>
            </div>
            {/* <CheckoutConfirmPage open={open} setOpen={setOpen} /> */}
        </div>
    )
}

export default Cart