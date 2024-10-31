import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useEffect } from "react";
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
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {loading ? (
        <SearchPageSkeleton />
      ) : !loading && allRestaurants?.data.length === 0 ? (
        <NoResultFound />
      ) : (
        allRestaurants?.data.map((restaurant: Restaurant) => (
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
              <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Featured
                </span>
              </div>
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