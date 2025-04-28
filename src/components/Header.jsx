import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const navItems = [
  { path: "/counter", name: "Counter" },
  { path: "/todo", name: "Todo" },
  { path: "/weather", name: "Weather" },
  { path: "/quiz", name: "Quiz" },
  { path: "/gallery", name: "Image Gallery" },
  { path: "/cart", name: "Shopping Cart" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-500 text-white sticky top-0 z-50">
      {/* Main header container */}
      <div className="container mx-auto px-4 py-3 md:px-8 md:h-[15vh] flex flex-col md:flex-row justify-between">
        {/* Logo and Hamburger */}
        <div className="flex items-center justify-between h-full">
          {/* A div that will contains the image and h1 test */}
          <div className="flex items-center h-full">
            <Link to="/" className="flex items-center h-full">
              <img
                src="./logo.jpg"
                alt="Image Icon"
                className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full cursor-pointer"
              />
            </Link>

            {/* The h1 text embedded inside a Link tag for it to be clickable*/}
            <Link to="/" className="flex items-center h-full">
              <h1 className="text-2xl md:text-4xl text-purple-500 cursor-pointer ml-4">
                App <span className="text-white">List</span>
              </h1>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none flex items-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center h-full">
          <ul className="flex items-center gap-4 h-full">
            {navItems.map((item) => (
              <li key={item.path} className="h-full flex items-center">
                <Link
                  to={item.path}
                  className="hover:text-purple-500 flex items-center gap-1 cursor-pointer py-2 px-3 rounded-md hover:bg-slate-600 transition-colors duration-200 h-full"
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile navigation */}

        {isMenuOpen && (
          <nav className="md:hidden bg-slate-600 mt-2 rounded-lg">
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-purple-500 flex items-center gap-3 cursor-pointer py-3 px-4 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
