import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import { CartItem } from "@/types/cartType";

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, []);

  // Loading state (if needed)
  if (!orders) {
    // console.log("orders",orders);
    
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700 dark:text-gray-300">Loading your orders...</p>
      </div>
    );
  }

  // Handle empty orders
  if (orders.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-[90vh] mx-2">
        <div className="flex items-center justify-center w-full">
          <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
            You haven't placed any orders yet. Start your first order now!
          </h1>
        </div>
        <Link to="/cart">
          <Button className="bg-green hover:bg-hoverGreen w-full py-3 rounded-md shadow-lg">
            Order Now
          </Button>
        </Link>
      </div>
    );
  }

  // Display orders
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full my-6">
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
          {orders.map((order: any, index: number) => (
            <div key={index}>
              {order.cartItems.map((item: CartItem) => (
                <div key={item._id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-800 dark:text-gray-200 flex items-center">
                        <IndianRupee />
                        <span className="text-lg font-medium">{item.price}</span>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
              <Separator className="mb-4" />
            </div>
          ))}
        </div>
        <Link to="/cart">
          <Button className="bg-green hover:bg-hoverGreen dark:text-white w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;