import { Timer } from "lucide-react"
import { Badge } from "./ui/badge"
import Menu from "./Menu"
import { useParams } from "react-router-dom";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";


const RestaurantPage = () => {

    const params = useParams();
    const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

    useEffect(() => {
        getSingleRestaurant(params.id!);
    }, [params.id]);


    return (
        <div className="max-w-6xl mx-auto my-10 min-h-[60vh]">
            <div className="w-full mx-2">
                <div className="relative w-full h-32 md:h-64 lg:h-72 ">
                    <img
                        src={singleRestaurant?.imageUrl || "Loading..."}
                        // src="bg.png"
                        alt="Restaurant Cover Image"
                        className="object-cover w-full h-full rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="my-5">
                        <h1 className="font-medium text-xl">
                            {singleRestaurant?.restaurantName || "Loading..."}
                            {/* Pappi Dhaba */}
                        </h1>
                        <div className="flex gap-2 my-2 flex-wrap">
                            {singleRestaurant?.cuisines.map((cuisine: string, idx: number) => (
                                <Badge key={idx}>{cuisine}</Badge>
                            ))}
                        </div>
                        <div className="flex md:flex-row flex-col gap-2 my-5">
                            <div className="flex items-center gap-2">
                                <Timer className="w-5 h-5" />
                                <h1 className="flex items-center gap-2 font-medium">
                                    Delivery Time:
                                    <span className="text-green dark:text-yellow-100">
                                        {singleRestaurant?.deliveryTime || "NA"} mins
                                        {/* 30 mins */}
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    singleRestaurant?.menus &&
                    <Menu menus={singleRestaurant?.menus!} />
                }
                {/* <Menu /> */}
            </div>
        </div>
    )
}

export default RestaurantPage