import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { Restaurant } from "@/types/restaurantType";

const AllRestaurants = () => {
  const { loading, allRestaurants, fetchAllRestaurants } = useRestaurantStore();

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage, setRestaurantsPerPage] = useState(6);

  const totalPages = Math.ceil((allRestaurants?.length || 0) / restaurantsPerPage);

  const startIndex = (currentPage - 1) * restaurantsPerPage;
  const currentRestaurants = allRestaurants?.slice(startIndex, startIndex + restaurantsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFirst = () => setCurrentPage(1);
  const handleLast = () => setCurrentPage(totalPages);

  const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRestaurantsPerPage(Number(event.target.value));
    setCurrentPage(1)
  };

  return (
    <div className="my-6 mx-4 lg:mx-12 md:mx-6 md:my-10">
      {
        allRestaurants?.length !== 0 && (
          <div className="flex items-center justify-end mb-4 mx-2">
            <label htmlFor="entriesPerPage" className="mr-2 text-gray-700 dark:text-gray-400">Number of entries:</label>
            <select
              id="entriesPerPage"
              value={restaurantsPerPage}
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
        {loading ? (
          <SearchPageSkeleton />
        ) : !loading && allRestaurants?.length === 0 ? (
          <NoResultFound />
        ) : (
          currentRestaurants?.map((restaurant: Restaurant) => (
            <Card
              key={restaurant._id}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative">
                <AspectRatio ratio={15 / 8}>
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.restaurantName}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              <CardContent className="p-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {restaurant.restaurantName}
                  {/* Pappi Dhaba */}
                </h1>
                <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  <p className="text-sm">
                    City:{" "}
                    <span className="font-medium">
                      {restaurant.city}
                      {/* Meerut */}
                    </span>
                  </p>
                </div>
                <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                  <Globe size={16} />
                  <p className="text-sm">
                    Country:{" "}
                    <span className="font-medium">
                      {restaurant.country}
                      {/* India */}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {restaurant.cuisines.slice(0, 3).map(
                    (cuisine: string, idx: number) => (
                      <Badge
                        key={idx}
                        className="font-medium px-2 py-1 rounded-full shadow-sm"
                      >
                        {cuisine}
                      </Badge>
                    )
                  )}
                  {
                    restaurant.cuisines.length > 3 && (
                      <span className="text-xs text-gray-600 my-auto  dark:text-yellow-100">+ {restaurant.cuisines.length - 3} more</span>
                    )
                  }
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                <Link to={`/restaurant/${restaurant._id}`}>
                  <Button className="bg-green hover:bg-hoverGreen dark:text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                    View Menus
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}

      </div>

      {
        allRestaurants?.length !== 0 && (
          <div className="flex items-center justify-center mt-6">
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
  )
}

export default AllRestaurants;

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
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any restaurats. <br />
      </p>
      <Link to="/">
        <Button className="mt-4 bg-green hover:bg-hoverGreen dark:text-white">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};