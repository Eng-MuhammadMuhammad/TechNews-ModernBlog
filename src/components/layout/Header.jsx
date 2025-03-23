import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../ui/DarkModeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          TechNews
        </Link>

        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <div className="hidden md:block">
            <DarkModeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
          >
            Categories
          </Link>
          <Link
            to="/trending"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
          >
            Trending
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              <Link
                to="/"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                onClick={toggleMenu}
              >
                Categories
              </Link>
              <Link
                to="/trending"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                onClick={toggleMenu}
              >
                Trending
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <DarkModeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
