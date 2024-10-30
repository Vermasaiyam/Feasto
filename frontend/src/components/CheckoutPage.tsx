import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { CheckoutSessionRequest } from "@/types/orderType";
import { useOrderStore } from "@/store/useOrderStore";

const CheckoutPage = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { user } = useUserStore();
    // const loading = false;
    // const user = {
    //     fullname: "Saiyam Verma",
    //     email: "vermasaiyam9@gmail.com",
    //     address: "meerut",
    //     city: "Meerut",
    //     country: "India",
    //     profilePicture: "",
    //     contact: 7251859585,
    // }
    const [input, setInput] = useState({
        name: user?.fullname || "",
        email: user?.email || "",
        contact: user?.contact.toString() || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "",
    });
    const { cart } = useCartStore();
    const { restaurant } = useRestaurantStore();
    const { createCheckoutSession, loading } = useOrderStore();
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    const checkoutHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const checkoutData: CheckoutSessionRequest = {
                cartItems: cart.map((cartItem) => ({
                    menuId: cartItem._id,
                    name: cartItem.name,
                    image: cartItem.image,
                    price: cartItem.price.toString(),
                    quantity: cartItem.quantity.toString(),
                })),
                deliveryDetails: input,
                restaurantId: restaurant?._id as string,
            };
            await createCheckoutSession(checkoutData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="ml-2 mr-4">
                <DialogTitle className="font-bold text-2xl">Review Your Order</DialogTitle>
                <DialogDescription className="text-sm">
                    Review your order details carefully to make sure everything is correct!!!
                </DialogDescription>
                <form
                    onSubmit={checkoutHandler}
                    className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
                >
                    <div>
                        <Label className="font-bold">Fullname</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="font-bold">Email</Label>
                        <Input
                            disabled
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="font-bold">Contact</Label>
                        <Input
                            type="text"
                            name="contact"
                            value={input.contact}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="font-bold">Address</Label>
                        <Input
                            type="text"
                            name="address"
                            value={input.address}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="font-bold">City</Label>
                        <Input
                            type="text"
                            name="city"
                            value={input.city}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="font-bold">Country</Label>
                        <Input
                            type="text"
                            name="country"
                            value={input.country}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <DialogFooter className="col-span-2 pt-5">
                        {loading ? (
                            <Button disabled className="bg-green hover:bg-hoverGreen dark:text-white">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button className="bg-green hover:bg-hoverGreen dark:text-white">
                                Pay Now
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutPage