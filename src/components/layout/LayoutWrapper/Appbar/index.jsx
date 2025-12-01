import React, { useState } from "react";
import Logo from "../../../../assets/logo.svg";
import search from "../../../../assets/search.svg";
import basket from "../../../../assets/basket.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart, selectCartItems } from "../../../../Redux Store/Slices/cart";
import { useSelector } from "react-redux";
import { logout } from "../../../../Redux Store/Slices/auth";
import { CustomAccordion } from "../../../common/CustomAccordion.jsx/CustomAccordion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

const Appbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const cartItems = useSelector(selectCartItems);
    const [activeLink, setActiveLink] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = link => {
        setActiveLink(link);
        setIsMenuOpen(false);
    };
    const handleLogout = async () => {
        await supabase.auth.signOut(); //supabase logout
        dispatch(clearCart());
        dispatch(logout());
        navigate("/");
    };
    const handleProfile = () => {
        if (isAuthenticated) {
            navigate("/profile");
        } else {
            navigate("/userLogin");
        }
    };

    return (
        <nav className="relative border-b border-[#D6D6D6]">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center px-4 py-4 xl:px-8">
                {/* Left margin */}
                <div className="hidden xl:block w-20"></div>

                {/* Logo */}
                <div className="mr-8 xl:mr-20">
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-2xl xl:text-3xl font-bold">LUMINA</h1>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-x-6 xl:gap-x-14">
                    <button
                        className={`${activeLink === "home" ? "text-[#45B618]" : "text-black"
                            } hover:text-[#45B618] transition-colors`}
                        onClick={() => {
                            handleLinkClick("home");
                            navigate("/");
                        }}
                    >
                        Home
                    </button>
                    <button
                        className={`${activeLink === "about" ? "text-[#45B618]" : "text-black"
                            } hover:text-[#45B618] transition-colors`}
                        onClick={() => {
                            handleLinkClick("about");
                            navigate("/about-us");
                        }}
                    >
                        About Us
                    </button>
                    <button
                        className={`${activeLink === "products" ? "text-[#45B618]" : "text-black"
                            } hover:text-[#45B618] transition-colors`}
                        onClick={() => {
                            handleLinkClick("products");
                            navigate("/products");
                        }}
                    >
                        Products
                    </button>
                    <button
                        className={`${activeLink === "contact" ? "text-[#45B618]" : "text-black"
                            } hover:text-[#45B618] transition-colors`}
                        onClick={() => {
                            handleLinkClick("contact");
                            navigate("/contact");
                        }}
                    >
                        Contact
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-x-6 xl:gap-x-10 ml-auto">
                    <div className="flex items-center gap-x-2 text-gray-600">
                        <img src={search} alt="" className="w-5 h-5" />
                        <span>Search</span>
                    </div>
                    {/* <a href="/userLogin" className="text-gray-800 hover:text-[#45B618]">
                        Login
                    </a> */}
                    <div>
                        <div className="relative">
                            {isAuthenticated ? (
                                <div className="relative group">
                                    <button className="text-gray-800 font-medium cursor-pointer">
                                        {user.name}
                                    </button>

                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500">
                                        {/* Triangle Arrow */}
                                        <div className="absolute -top-2 right-7 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-300"></div>

                                        <ul className="py-2">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#262626] font-semibold"
                                                onClick={handleProfile}
                                            >
                                                Profile
                                            </li>
                                            <hr className="border-r-2  w-[85%] ml-2  border-[#DEE4ED]" />
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#262626] font-semibold">
                                                Orders
                                            </li>
                                            <hr className="border-r-2  w-[85%] ml-2  border-[#DEE4ED]" />
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#262626] font-semibold whitespace-nowrap">
                                                My Subscriptions
                                            </li>
                                            <hr className="border-r-2  w-[85%] ml-2  border-[#DEE4ED]" />
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#262626] font-semibold"
                                                onClick={handleLogout}
                                            >
                                                Sign Out
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    className="text-gray-800 hover:text-[#45B618]"
                                    to="/userLogin"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="h-5 w-px bg-black"></div>
                    <div className="relative cursor-pointer -ml-2 pr-8 xl:pr-12">
                        <Link to="/cart">
                            <img src={basket} alt="Cart" className="w-6 h-6" />
                        </Link>
                        <div className="absolute -top-1 left-4 bg-[#04A42A] text-white text-[10px] font-[800px] leading-[12px]  w-4 h-4 flex items-center justify-center rounded-full">
                            {cartItems.reduce(
                                (accumulator, currentItem) => accumulator + currentItem.quantity,
                                0,
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
                <div className="flex items-center justify-between px-4 py-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-xl font-bold">LUMINA</h1>

                    <div className="flex items-center gap-x-4">
                        <img src={search} alt="Search" className="w-5 h-5" />
                        <Link to="/cart">
                            <img src={basket} alt="Cart" className="w-6 h-6" />
                            <div className="cart-items-count">
                                {cartItems.reduce(
                                    (accumulator, currentItem) =>
                                        accumulator + currentItem.quantity,
                                    0,
                                )}
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border-b border-[#D6D6D6] z-50">
                        <div className="flex flex-col px-4 py-2">
                            <a
                                href="/"
                                className={`py-2 ${activeLink === "home" ? "text-[#45B618]" : "text-black"}`}
                                onClick={() => handleLinkClick("home")}
                            >
                                Home
                            </a>
                            <a
                                href="/about-us"
                                className={`py-2 ${activeLink === "about" ? "text-[#45B618]" : "text-black"}`}
                                onClick={() => handleLinkClick("about")}
                            >
                                About Us
                            </a>
                            <a
                                href="/products"
                                className={`py-2 ${activeLink === "products" ? "text-[#45B618]" : "text-black"}`}
                                onClick={() => handleLinkClick("products")}
                            >
                                Products
                            </a>
                            <a
                                href="/contact"
                                className={`py-2 ${activeLink === "contact" ? "text-[#45B618]" : "text-black"}`}
                                onClick={() => handleLinkClick("contact")}
                            >
                                Contact
                            </a>
                            <a href="/login" className="py-2 text-gray-800">
                                Login
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Appbar;
