import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
// import { useNavigate } from "react-router-dom";
import { MenuItem } from "@/types/restaurantType";
import { useCartStore } from "@/store/useCartStore";

const Menu = ({ menus }: { menus: MenuItem[] }) => {
    const { addToCart } = useCartStore();

    const reversedMenus = menus.slice().reverse();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(6);

    // Calculate total pages
    const totalPages = Math.ceil(reversedMenus.length / entriesPerPage);

    // Get menus for the current page
    const currentMenus = reversedMenus.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    // Handle page changes
    const goToPage = (page: number) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };

    // Generate page numbers
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">
                Available Menus
            </h1>

            {/* Entries Per Page Selector */}
            <div className="flex items-center justify-end mb-4 mx-2">
                <label htmlFor="entriesPerPage" className="mr-2 text-gray-700 dark:text-gray-400">
                    Number of entries:
                </label>
                <select
                    id="entriesPerPage"
                    value={entriesPerPage}
                    onChange={(e) => {
                        setEntriesPerPage(parseInt(e.target.value));
                        setCurrentPage(1); // Reset to the first page on change
                    }}
                    className="border border-gray-300 rounded-md p-1 dark:bg-gray-800 dark:text-white"
                >
                    {[2, 3, 4, 5, 6, 7, 8].map((entry) => (
                        <option key={entry} value={entry}>
                            {entry}
                        </option>
                    ))}
                </select>
            </div>

            {/* Menu Items */}
            <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
                {currentMenus.map((menu: MenuItem, index) => (
                    <Card
                        key={index} // Added key for rendering
                        className="max-w-xs shadow-lg rounded-lg overflow-hidden relative mx-2"
                    >
                        <img
                            src={menu.image}
                            alt={menu.name}
                            className="w-full h-40 object-contain"
                        />
                        <div className="absolute top-2 left-2 bg-white dark:bg-gray-900 rounded-full p-1 cursor-pointer">
                            <Heart className="w-5 h-5" />
                        </div>
                        <CardContent className="p-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                {menu.name}
                            </h2>
                            <p
                                className="text-sm text-gray-600 mt-2 dark:text-gray-400 line-clamp-1"
                                title={menu.description}
                            >
                                {menu.description}
                            </p>
                            <div className="flex flex-row justify-between items-center mt-4">
                                <h3 className="text-lg font-bold text-green dark:text-yellow-100">
                                    ₹{menu.price}
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

            {/* Pagination Buttons */}
            <div className="flex justify-center overflow-y-scroll items-center mt-6 space-x-2">
                <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300"
                >
                    First
                </button>
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300"
                >
                    Previous
                </button>
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 text-sm rounded-md ${currentPage === page ? 'bg-green text-white' : 'bg-gray-200 text-gray-700'} hover:bg-hoverGreen hover:text-white`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300"
                >
                    Next
                </button>
                <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300"
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default Menu;