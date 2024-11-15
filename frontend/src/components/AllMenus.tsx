import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { useMenuStore } from "@/store/useMenuStore";
import { Menu } from "@/types/menuType";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const AllMenus = () => {
    const { loading, allMenus, fetchAllMenus } = useMenuStore();
    const { addToCart } = useCartStore();
    // const loading: boolean = false;

    const [menusPerPage, setMenusPerPage] = useState(6);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((allMenus?.length || 0) / menusPerPage);

    const startIndex = (currentPage - 1) * menusPerPage;
    const currentMenus = allMenus?.slice(startIndex, startIndex + menusPerPage);


    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleFirst = () => setCurrentPage(1);
    const handleLast = () => setCurrentPage(totalPages);

    const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMenusPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchAllMenus();
    }, []);

    return (
        <div className="my-10 mx-4">
            <div className="flex flex-col w-full">
                {
                    allMenus?.length !== 0 && (
                        <div className="flex items-center justify-end mb-4 mx-2">
                            <label htmlFor="entriesPerPage" className="mr-2 text-gray-700 dark:text-gray-400">Number of entries:</label>
                            <select
                                id="entriesPerPage"
                                value={menusPerPage}
                                onChange={handleEntriesChange}
                                className="border border-gray-300 rounded-md p-1 dark:bg-gray-800 dark:text-white"
                            >
                                {[2, 3, 4, 5, 6, 7, 8].map((number) => (
                                    <option key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )
                }
                <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-8 gap-8 md:mx-12 md:my-10 my-6 mx-6">
                    {
                        loading ? (
                            <SearchPageSkeleton />
                        ) : !loading && allMenus?.length === 0 ? (
                            <NoResultFound />
                        ) : (
                            currentMenus?.map((menu: Menu) => (
                                <div key={menu._id}>
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
                                            {
                                                menu.restaurantName && (
                                                    <p className=" text-gray-700 mt-2 dark:text-gray-400">
                                                        Restaurant - {menu.restaurantName}
                                                    </p>
                                                )
                                            }
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
                                                        // navigate("/cart");
                                                    }}
                                                    className="rounded-full border border-green dark:border-yellow-50 dark:text-yellow-50 text-green hover:bg-green hover:text-white"
                                                >
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))
                        )
                    }

                </div>

                {
                    allMenus?.length !== 0 && (
                        <div className="w-full flex items-center justify-center mt-4">
                            <div className="flex items-center space-x-2 overflow-y-scroll ml-2">
                                {/* First Button */}
                                <button
                                    onClick={handleFirst}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300"
                                >
                                    First
                                </button>

                                {/* Previous Button */}
                                <button
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300"
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-4 py-2 text-sm rounded-md ${currentPage === index + 1 ? 'bg-green text-white' : 'bg-gray-200 text-gray-700'} hover:bg-hoverGreen hover:text-white`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                {/* Next Button */}
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300"
                                >
                                    Next
                                </button>

                                {/* Last Button */}
                                <button
                                    onClick={handleLast}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300"
                                >
                                    Last
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AllMenus;

const SearchPageSkeleton = () => {
    return (
        <>
            {[...Array(3)].map((_, index) => (
                <Card
                    key={index}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
                >
                    <div className="relative">
                        <AspectRatio ratio={16 / 6}>
                            <Skeleton className="w-full h-full" />
                        </AspectRatio>
                    </div>
                    <CardContent className="p-4">
                        <Skeleton className="h-8 w-3/4 mb-2" />
                        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="flex gap-2 mt-4 flex-wrap">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
                        <Skeleton className="h-10 w-24 rounded-full" />
                    </CardFooter>
                </Card>
            ))}
        </>
    );
};

const NoResultFound = () => {
    return (
        <div className="w-[100vw] h-80 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                No results found.
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
                We couldn't find any events. <br />
            </p>
            <Link to="/">
                <Button className="mt-4 bg-green hover:bg-hoverGreen dark:text-white">
                    Go Back to Home
                </Button>
            </Link>
        </div>
    );
};