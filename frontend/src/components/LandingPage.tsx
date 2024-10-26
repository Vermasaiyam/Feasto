import { Button } from "@chakra-ui/icons"
import { Search } from "lucide-react"
import { useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row max-w-8xl lg:mx-20 md:mx-12 mx-4 py-4 px-6 bg-lightGreen md:p-10 rounded-lg items-center justify-around m-4 gap-20 box-border">
            <div className="flex flex-1 flex-col lg:gap-10 md:gap-7 gap-5 md:w-[40%]">
                <div className="flex flex-col md:gap-5 gap-2">
                    <h1 className="md:font-bold font-bold lg:leading-none md:leading-tight lg:font-extrabold md:text-5xl text-4xl">
                        Fastest In Delivering The Food
                    </h1>
                    <p className="text-gray-500">
                        Satisfy Your Cravings with a Click!
                    </p>
                </div>
                <div className="relative flex items-center gap-2">
                    <Input
                        type="text"
                        value={searchText}
                        placeholder="Search restaurant by name, city & country"
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-10 shadow-lg"
                    />
                    <Search className="text-gray-500 absolute inset-y-2 left-2" />
                    <Button onClick={() => navigate(`/search/${searchText}`)} className="px-2 md:py-1.5 py-2 md:text-base text-sm text-white shadow-lg bg-green hover:bg-hoverGreen rounded-sm">Search</Button>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <img
                    src="bg.png"
                    alt="Gackground Image"
                    className="object-cover lg:max-h-[550px] md:max-h-[500px] max-h-[350px]"
                />
            </div>
        </div>
    )
}

export default LandingPage