import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Restaurant = () => {
    const [input, setInput] = useState({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
    });

    const loading: boolean = false;
    const restaurant: boolean = false;

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === "number" ? Number(value) : value });
    };

    const submitHandler = () => {


    }
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="mx-2">
                <div>
                    <h1 className="font-extrabold text-2xl mb-5">
                        {
                            restaurant
                                ? "Update Your Restaurant"
                                : "Add Your Restaurant"
                        }
                    </h1>
                    <form onSubmit={submitHandler}>
                        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                            {/* Restaurant Name  */}
                            <div>
                                <Label>Restaurant Name</Label>
                                <Input
                                    type="text"
                                    name="restaurantName"
                                    value={input.restaurantName}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your restaurant name"
                                />
                                {/* {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.restaurantName}
                                    </span>
                                )} */}
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    value={input.city}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your city name"
                                />
                                {/* {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.city}
                                    </span>
                                )} */}
                            </div>
                            <div>
                                <Label>Country</Label>
                                <Input
                                    type="text"
                                    name="country"
                                    value={input.country}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your country name"
                                />
                                {/* {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.country}
                                    </span>
                                )} */}
                            </div>
                            <div>
                                <Label>Delivery Time</Label>
                                <Input
                                    type="number"
                                    name="deliveryTime"
                                    value={input.deliveryTime}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your delivery time"
                                />
                                {/* {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.deliveryTime}
                                    </span>
                                )} */}
                            </div>
                            <div>
                                <Label>Cuisines</Label>
                                <Input
                                    type="text"
                                    name="cuisines"
                                    value={input.cuisines}
                                    // onChange={(e) =>
                                    //     setInput({ ...input, cuisines: e.target.value.split(",") })
                                    // }
                                    placeholder="E.g. Momos, Biryani"
                                />
                                {/* {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.cuisines}
                                    </span>
                                )} */}
                            </div>
                            <div>
                                <Label>Upload Restaurant Banner</Label>
                                <Input
                                    // onChange={(e) =>
                                    //     setInput({
                                    //         ...input,
                                    //         imageFile: e.target.files?.[0] || undefined,
                                    //     })
                                    // }
                                    type="file"
                                    accept="image/*"
                                    name="imageFile"
                                />
                                {/* {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.imageFile?.name}
                                    </span>
                                )} */}
                            </div>
                        </div>
                        <div className="my-5 w-full flex items-center justify-center">
                            {loading ? (
                                <Button disabled className="bg-green hover:bg-hoverGreen">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button className="bg-green hover:bg-hoverGreen">
                                    {
                                        restaurant
                                            ? "Update Your Restaurant"
                                            : "Add Your Restaurant"
                                    }
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Restaurant