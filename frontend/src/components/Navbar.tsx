// import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "./ui/button";
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import InitialsAvatar from 'react-initials-avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "./ui/separator";



const Navbar = () => {
  const admin: boolean = true;
  const loading: boolean = false;
  const cart = [];

  return (
    <nav className="bg-white px-4 shadow-sm">
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}
        <Link to={'/'} className="flex items-center">
          <img src="/logo.png" alt="Feasto Logo" className="md:h-20 h-16 mr-0" />
          <span className="md:font-bold md:text-xl font-semibold text-lg text-hoverGreen">FEASTO</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:text-hoverGreen font-medium">Home</Link>
          <Link to="/profile" className="hover:text-hoverGreen  font-medium">Profile</Link>
          <Link to="/order/status" className="hover:text-hoverGreen  font-medium">Order</Link>
          <Link to="/menu" className="hover:text-hoverGreen  font-medium">Menu</Link>
          <Link to="/restaurants" className="hover:text-hoverGreen  font-medium">Restaurant</Link>

          {admin && (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">Dashboard</MenubarTrigger>
                <MenubarContent>
                  <Link to="/admin/restaurant">
                    <MenubarItem className="cursor-pointer">Restaurant</MenubarItem>
                  </Link>
                  <Link to="/admin/menu">
                    <MenubarItem className="cursor-pointer">Menu</MenubarItem>
                  </Link>
                  <Link to="/admin/orders">
                    <MenubarItem className="cursor-pointer">Orders</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>

        {/* Right-side buttons */}
        <div className="hidden md:flex space-x-4 items-center">

          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart />
            {cart.length > 0 && (
              <Button
                size={"icon"}
                className="absolute -inset-y-3 left-4 -top-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
              >
                {cart.length}
              </Button>
            )}
          </Link>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem >Light</DropdownMenuItem>
                <DropdownMenuItem >Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <Avatar>
              <AvatarImage src="" alt="profilephoto" />
              <AvatarFallback>SV</AvatarFallback>
            </Avatar>
          </div>
          <div>
            {loading ? (
              <Button className="bg-green hover:bg-hoverGreen">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                // onClick={logout}
                className="bg-green hover:bg-hoverGreen"
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>

    </nav>
  )
}

export default Navbar

const MobileNavbar = () => {
  // const { user, logout, loading } = useUserStore();
  // const { setTheme } = useThemeStore();

  const admin: boolean = true;
  const loading: boolean = false;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-hoverGreen">FEASTO</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem >Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          {admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>SV</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Saiyam Verma</h1>
          </div>
          <SheetClose asChild>
            {loading ? (
              <Button className="bg-green hover:bg-hoverGreen">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                // onClick={logout}
                className="bg-green hover:bg-hoverGreen"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};