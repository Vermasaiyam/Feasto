import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Menu = () => {
    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">
                Available Menus
            </h1>
            <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
                {["biryani", "momos", "noodles"].map((menu: string) => (
                    <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden relative">
                        <img src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg" alt="Menu Image" className="w-full h-40 object-cover" />
                        <div className="absolute top-2 left-2 bg-white rounded-full p-1 cursor-pointer">
                            <Heart className="w-5 h-5" />
                        </div>
                        <CardContent className="p-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                {/* {menu.name} */}
                                {menu}
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                                {/* {menu.description} */}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex et perspiciatis cumque impedit similique atque.
                            </p>
                            <div className="flex flex-row justify-between items-center mt-4">
                                <h3 className="text-lg font-bold text-green">
                                    {/* ₹{menu.price} */}
                                    ₹150
                                </h3>

                                <Button
                                    variant={"outline"}
                                    onClick={() => {
                                        // addToCart(menu);
                                        // navigate("/cart");
                                    }}
                                    className="rounded-full border border-green text-green hover:bg-green hover:text-white"
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </CardContent>
                        {/* <CardFooter className="p-4">
                            <Button
                                onClick={() => {
                                    // addToCart(menu);
                                    // navigate("/cart");
                                }}
                                className="w-full bg-green hover:bg-hoverGreen"
                            >
                                Add to Cart
                            </Button>
                        </CardFooter> */}
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Menu