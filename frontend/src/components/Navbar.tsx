import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const admin: boolean = true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <Link to="/foods" className="hover:text-hoverGreen  font-medium">Foods</Link>
          <Link to="/restaurants" className="hover:text-hoverGreen  font-medium">Restaurants</Link>

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
        <div className="hidden md:flex space-x-4">
          <button className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex w-[100%] justify-end">
          <div
            className={`fixed md:top-20 top-14 right-0 h-screen bg-white w-[40vw] md:hidden shadow-lg transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="flex flex-col gap-2 items-end px-4 space-y-2 mt-4">
              <Link to="/" className="hover:text-hoverGreen font-medium">Home</Link>
              <Link to="/profile" className="hover:text-hoverGreen  font-medium">Profile</Link>
              <Link to="/order/status" className="hover:text-hoverGreen  font-medium">Order</Link>
              <Link to="/foods" className="hover:text-hoverGreen  font-medium">Foods</Link>
              <Link to="/restaurants" className="hover:text-hoverGreen  font-medium">Restaurants</Link>

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

            <div className="flex space-x-4 px-4 mt-4 justify-end w-full">
              <button className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>


      )}
    </nav>
  )
}

export default Navbar