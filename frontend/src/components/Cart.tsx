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
import CheckoutPage from "./CheckoutPage";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartType";
import { Link } from "react-router-dom";

const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { cart, decrementQuantity, incrementQuantity, removeFromTheCart, clearCart } = useCartStore();

    let totalAmount = cart.reduce((acc, ele) => {
        return acc + ele.price * ele.quantity;
    }, 0);

    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            {
                cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 my-28">
                        <span className="text-gray-600 md:text-base text-sm">No items in the cart.</span>
                        <Link to={'/'}>
                            <Button className="bg-green hover:bg-hoverGreen">
                                Order Now
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="">
                        <div className="flex justify-end">
                            <Button variant="link" onClick={clearCart}>Clear All</Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-darkGreen dark:text-yellow-50 text-lg">Items</TableHead>
                                    <TableHead className="text-darkGreen dark:text-yellow-50 text-lg">Title</TableHead>
                                    <TableHead className="text-darkGreen dark:text-yellow-50 text-lg">Price</TableHead>
                                    <TableHead className="text-darkGreen dark:text-yellow-50 text-lg">Quantity</TableHead>
                                    <TableHead className="text-darkGreen dark:text-yellow-50 text-lg">Total</TableHead>
                                    <TableHead className="text-right text-darkGreen dark:text-yellow-50 text-lg">Remove</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.map((item: CartItem) => (
                                    <TableRow>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage src={item.image} alt={item.name} />
                                                <AvatarFallback>Item</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell> {item.name}</TableCell>
                                        <TableCell> {item.price}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center rounded-full">
                                                <Button
                                                    onClick={() => decrementQuantity(item._id)}
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
                                                    {item.quantity}
                                                    {/* 2 */}
                                                </Button>
                                                <Button
                                                    onClick={() => incrementQuantity(item._id)}
                                                    size={"icon"}
                                                    className="rounded-full bg-green hover:bg-hoverGreen text-white hover:text-white"
                                                    variant={"outline"}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item.price * item.quantity}
                                            {/* {500 * 2} */}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button onClick={() => removeFromTheCart(item._id)} size={"sm"} variant={"outline"} className="hover:text-white text-green border border-green hover:bg-green">
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
                                        ₹{totalAmount}
                                        {/* ₹5000 */}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <div className="flex justify-end my-5">
                            <Button
                                onClick={() => setOpen(true)}
                                className="bg-green hover:bg-hoverGreen dark:text-white"
                                disabled={cart.length === 0}
                            >
                                Proceed To Checkout
                            </Button>
                        </div>
                        <CheckoutPage open={open} setOpen={setOpen} />

                    </div>
                )
            }
        </div>
    )
}

export default Cart