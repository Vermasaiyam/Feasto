import { useUserStore } from "@/store/useUserStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ChangeUserRole from "./ChangeUserRole";
import { Input } from "@/components/ui/input";

const RestaurantOwners = () => {
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    fullname: "",
    email: "",
    contact: null,
    address: "",
    city: "",
    country: "",
    admin: false,
    _id: ""
  });
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { allUsers, fetchAllUsers } = useUserStore();
  const { allRestaurants, fetchAllRestaurants } = useRestaurantStore();

  const totalPages = Math.ceil(adminUsers.length / entriesPerPage);

  useEffect(() => {
    const loadData = async () => {
      await fetchAllUsers();
      await fetchAllRestaurants();
      setLoading(false);
    };
    loadData();
  }, [fetchAllUsers, fetchAllRestaurants]);

  useEffect(() => {
    if (allUsers) {
      setAdminUsers(allUsers.filter(user => user.admin === true));
    }
  }, [allUsers]);

  // Get restaurant name
  const getRestaurantName = (userId: string) => {
    const restaurant = allRestaurants?.find(restaurant => restaurant.user.includes(userId));
    return restaurant ? restaurant.restaurantName : "No Restaurant Registered";
  };

  // Search functionality
  const filteredUsers = adminUsers.filter((user) => {
    const restaurantName = getRestaurantName(user._id);
    const searchLower = searchTerm.toLowerCase();
    return (
      user.fullname.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.contact?.toString().includes(searchLower) ||
      user.address.toLowerCase().includes(searchLower) ||
      user.city.toLowerCase().includes(searchLower) ||
      user.country?.toString().includes(searchLower) ||
      restaurantName.toLowerCase().includes(searchLower)
    );
  });


  const renderSkeletonRows = () => {
    return Array.from({ length: entriesPerPage }).map((_, index) => (
      <TableRow key={index} className="animate-pulse dark:bg-black bg-white">
        {Array.from({ length: 9 }).map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-full"></div>
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  // Pagination controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPreviousPage = () => goToPage(currentPage - 1);

  // Get paginated users
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="md:mt-4 mt-2">

      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 mx-2 space-y-2 md:space-y-0">
        <label className="text-sm flex items-center">
          Show
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="mx-2 p-1 border rounded dark:bg-gray-600 w-20 md:w-auto"
          >
            {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          entries
        </label>

        <Input
          type="text"
          placeholder="Search by name, email, contact, address, city, country or restaurant name."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition ease-in-out dark:bg-gray-600 dark:text-white w-full md:w-1/3"
        />
      </div>

      <Table className="lg:text-base md:text-sm text-xs">
        <TableHeader>
          <TableRow className="bg-black hover:bg-black dark:bg-white dark:hover:bg-white">
            <TableHead className="font-bold dark:text-black text-white">S.No.</TableHead>
            <TableHead className="dark:text-black font-bold text-white">Restaurant Name</TableHead>
            <TableHead className="dark:text-black font-bold text-white">User Name</TableHead>
            <TableHead className="dark:text-black font-bold text-white">Email</TableHead>
            <TableHead className="dark:text-black font-bold text-white">Contact Number</TableHead>
            <TableHead className="dark:text-black font-bold text-white">Address</TableHead>
            <TableHead className="dark:text-black font-bold text-white">City</TableHead>
            <TableHead className="dark:text-black font-bold text-white">Country</TableHead>
            <TableHead className="dark:text-black font-bold text-white">Created Date</TableHead>
            <TableHead className="dark:text-black font-bold text-white">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            renderSkeletonRows()
          ) : (
            paginatedUsers.map((el, index) => (
              <TableRow key={index} className="dark:bg-black dark:hover:bg-black bg-white hover:bg-white">
                <TableCell className="font-medium">{(currentPage - 1) * entriesPerPage + index + 1}</TableCell>
                <TableCell className="font-semibold">{getRestaurantName(el?._id)}</TableCell>
                <TableCell>{el?.fullname}</TableCell>
                <TableCell>{el?.email}</TableCell>
                <TableCell>{el?.contact}</TableCell>
                <TableCell>{el?.address === "Update your address" ? "-" : el.address}</TableCell>
                <TableCell>{el?.city === "Update your city" ? "-" : el.city}</TableCell>
                <TableCell>{el?.country === "Update your country" ? "-" : el.country}</TableCell>
                <TableCell>{moment(el?.createdAt).format("LL")}</TableCell>
                <TableCell>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green dark:hover:bg-[#2E3A52] hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {
        filteredUsers.length === 0 && (
          <p className="w-full flex items-center justify-center my-8">No Restaurant Owners found.</p>
        )
      }

      {/* Pagination Controls */}
      <div className="flex overflow-y-scroll justify-center my-4 space-x-2">
        <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300">
          First
        </button>
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300">
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`px-4 py-2 text-sm rounded-md ${currentPage === index + 1 ? 'bg-green text-white' : 'bg-gray-200 text-gray-700'} hover:bg-hoverGreen`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300">
          Next
        </button>
        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 disabled:bg-gray-300">
          Last
        </button>
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          fullname={updateUserDetails.fullname}
          email={updateUserDetails.email}
          admin={updateUserDetails.admin}
          // allRestaurants={allRestaurants}
          userId={updateUserDetails._id}
        />
      )}
    </div>
  );
};

export default RestaurantOwners;