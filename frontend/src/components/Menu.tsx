import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
// import { useNavigate } from "react-router-dom";
import { MenuItem } from "@/types/restaurantType";
import { useCartStore } from "@/store/useCartStore";

const Menu = ({ menus }: { menus: MenuItem[] }) => {

    const { addToCart } = useCartStore();

    const reversedMenus = menus.slice().reverse();

    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">
                Available Menus
            </h1>
            <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
                {reversedMenus.map((menu: MenuItem) => (
                    <Card className="max-w-xs shadow-lg rounded-lg overflow-hidden relative mx-2">
                        <img src={menu.image} alt={menu.name} className="w-full h-40 object-contain" />
                        <div className="absolute top-2 left-2 bg-white dark:bg-gray-900 rounded-full p-1 cursor-pointer">
                            <Heart className="w-5 h-5" />
                        </div>
                        <CardContent className="p-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                {menu.name}
                                {/* {menu} */}
                            </h2>
                            <p className="text-sm text-gray-600 mt-2 dark:text-gray-400 line-clamp-1" title={menu.description}>
                                {menu.description}
                                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex et perspiciatis cumque impedit similique atque. */}
                            </p>
                            <div className="flex flex-row justify-between items-center mt-4">
                                <h3 className="text-lg font-bold text-green dark:text-yellow-100">
                                    ₹{menu.price}
                                    {/* ₹150 */}
                                </h3>

                                <Button
                                    variant={"outline"}
                                    onClick={() => {
                                        addToCart(menu);
                                    }}
                                    className="rounded-full border border-green dark:border-yellow-50 dark:text-yellow-50 text-green hover:bg-green hover:text-white"
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Menu