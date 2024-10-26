import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const Menu = () => {
    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">
                Available Menus
            </h1>
            <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
                {["biryani", "momos", "noodles"].map((menu: string) => (
                    <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                        <img src="bg.png" alt="Menu Image" className="w-full h-40 object-cover" />
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {/* {menu.name} */}
                                {menu}
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                                {/* {menu.description} */}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex et perspiciatis cumque impedit similique atque.
                            </p>
                            <h3 className="text-lg font-semibold mt-4">
                                Price:
                                <span className="text-green">
                                    {/* ₹{menu.price} */}
                                    150
                                </span>
                            </h3>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button
                                onClick={() => {
                                    // addToCart(menu);
                                    // navigate("/cart");
                                }}
                                className="w-full bg-green hover:bg-hoverGreen"
                            >
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Menu