import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Success = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Order Status:{" "}
                        <span className="text-[#FF5A5A]">{"confirm".toUpperCase()}</span>
                    </h1>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Order Summary
                    </h2>
                    {/* Your Ordered Item Display here  */}
                    {[1, 2,3].map((order: any, index: number) => (
                        <div key={index}>
                            {[1, 2].map((item) => (
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img
                                                src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg"
                                                alt=""
                                                className="w-14 h-14 rounded-md object-cover"
                                            />
                                            <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                                                {/* {item.name} */}
                                                Lorem, ipsum.
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-800 dark:text-gray-200 flex items-center">
                                                <IndianRupee />
                                                <span className="text-lg font-medium">
                                                    {/* {item.price} */}
                                                    5000
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <Link to="/cart">
                    <Button className="bg-green hover:bg-hoverGreen w-full py-3 rounded-md shadow-lg">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Success