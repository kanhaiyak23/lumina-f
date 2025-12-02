import React from "react";

import leaf from "../../../../assets/leaf.svg";
import { Link } from "react-router-dom";
const Appbar = () => {
    return (
        <>
            <div className="bg-[#1a1a1a] text-white py-8 w-full">
                <div className="main-content-container w-full max-w-full">
                    {/* <!-- Logo Section --> */}
                    <div className="flex justify-center items-center mb-8 px-6 h-[44px] bg-white rounded-lg p-2">
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-2xl font-bold">LUMINA</p>
                    </div>

                    {/* <!-- Main Content Grid --> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-full">
                        {/* <!-- Customer Service --> */}
                        <div className="flex flex-col">
                            <h3 className="text-purple-400 text-lg mb-4 font-bold">
                                Customer Service
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link to="/about-us" className="hover:text-purple-400 transition-colors">
                                    About Us
                                </Link>
                                <Link to="/products" className="hover:text-purple-400 transition-colors">
                                    Shop
                                </Link>
                                
                                
                            </div>
                        </div>

                        {/* <!-- Company --> */}
                        <div className="flex flex-col">
                            <h3 className="text-purple-400 text-lg mb-4 font-bold">Company</h3>
                            <div className="flex flex-col space-y-2">
                                <Link to="/about-us" className="hover:text-purple-400 transition-colors">
                                    Our Story
                                </Link>
                                
                                <Link to="/terms" className="hover:text-purple-400 transition-colors">
                                    Terms & Conditions
                                </Link>
                                <Link to="/privacy" className="hover:text-purple-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>

                        {/* <!-- Links --> */}
                        <div className="flex flex-col">
                            <h3 className="text-purple-400 text-lg mb-4 font-bold">Help</h3>
                            <div className="flex flex-col space-y-2">
                                
                                
                                <Link to="/refund-policy" className="hover:text-purple-400 transition-colors">
                                    Returns & Exchanges
                                </Link>
                                <Link to="/shipping-policy" className="hover:text-purple-400 transition-colors">
                                    Shipping Info
                                </Link>
                            </div>
                        </div>

                       

                        {/* <!-- Connect With Us --> */}
                        <div className="flex flex-col">
                            <h3 className="text-purple-400 text-lg mb-4 font-bold">
                                Connect With Us
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <a
                                    href="tel:+918076419629"
                                    className="flex items-center hover:text-purple-400 transition-colors"
                                >
                                    <span className="mr-2 flex-shrink-0">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M22.68 16.5067C21.04 16.5067 19.4533 16.24 17.9733 15.76C17.7415 15.6814 17.4922 15.6697 17.254 15.7263C17.0158 15.7829 16.7984 15.9055 16.6267 16.08L14.5333 18.7067C10.76 16.9067 7.22667 13.5067 5.34667 9.6L7.94667 7.38667C8.30667 7.01333 8.41333 6.49333 8.26667 6.02667C7.77333 4.54667 7.52 2.96 7.52 1.32C7.52 0.6 6.92 0 6.2 0H1.58667C0.866667 0 0 0.32 0 1.32C0 13.7067 10.3067 24 22.68 24C23.6267 24 24 23.16 24 22.4267V17.8267C24 17.1067 23.4 16.5067 22.68 16.5067Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                    <span className="flex-grow truncate">+918076419629</span>
                                </a>
                                <a
                                    href="mailto:support@lumina.com"
                                    className="flex items-center hover:text-purple-400 transition-colors"
                                >
                                    <span className="mr-2 flex-shrink-0">
                                        <svg
                                            width="20"
                                            height="16"
                                            viewBox="0 0 30 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4.5 24C3.30653 24 2.16193 23.5259 1.31802 22.682C0.474106 21.8381 0 20.6935 0 19.5V4.5C0 3.30653 0.474106 2.16193 1.31802 1.31802C2.16193 0.474106 3.30653 0 4.5 0H25.5C26.6935 0 27.8381 0.474106 28.682 1.31802C29.5259 2.16193 30 3.30653 30 4.5V19.5C30 20.6935 29.5259 21.8381 28.682 22.682C27.8381 23.5259 26.6935 24 25.5 24H4.5ZM8.4375 6.33C8.2847 6.19953 8.10725 6.10108 7.91567 6.0405C7.72409 5.97993 7.5223 5.95846 7.32227 5.97737C7.12223 5.99628 6.92804 6.05519 6.75121 6.15059C6.57438 6.246 6.41852 6.37596 6.29288 6.53276C6.16724 6.68955 6.07438 6.86999 6.01982 7.06337C5.96525 7.25674 5.9501 7.45911 5.97524 7.65845C6.00039 7.8578 6.06533 8.05006 6.16621 8.22383C6.26709 8.39759 6.40186 8.54932 6.5625 8.67L12.1875 13.1715C12.9856 13.8105 13.9776 14.1587 15 14.1587C16.0224 14.1587 17.0144 13.8105 17.8125 13.1715L23.4375 8.6715C23.5913 8.54839 23.7194 8.39618 23.8145 8.22356C23.9095 8.05094 23.9696 7.8613 23.9913 7.66546C24.013 7.46962 23.996 7.27142 23.9411 7.08218C23.8862 6.89293 23.7946 6.71634 23.6715 6.5625C23.5484 6.40866 23.3962 6.28057 23.2236 6.18555C23.0509 6.09053 22.8613 6.03044 22.6655 6.00871C22.4696 5.98698 22.2714 6.00404 22.0822 6.05891C21.8929 6.11378 21.7163 6.20539 21.5625 6.3285L15.9375 10.8285C15.6715 11.0415 15.3408 11.1576 15 11.1576C14.6592 11.1576 14.3285 11.0415 14.0625 10.8285L8.4375 6.3285V6.33Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                    <span className="flex-grow ">support@lumina.com</span>
                                </a>
                                <div className="flex items-center">
                                    <span className="mr-2 flex-shrink-0">
                                        <svg
                                            width="16"
                                            height="22"
                                            viewBox="0 0 19 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.42858 0C6.92887 0.00294898 4.53239 0.997261 2.76483 2.76482C0.99727 4.53238 0.00295901 6.92886 1.0031e-05 9.42857C-0.00298388 11.4713 0.664279 13.4587 1.89944 15.0857C1.89944 15.0857 2.15658 15.4243 2.19858 15.4731L9.42858 24L16.662 15.4689C16.6997 15.4234 16.9577 15.0857 16.9577 15.0857L16.9586 15.0831C18.1931 13.4568 18.8601 11.4704 18.8572 9.42857C18.8542 6.92886 17.8599 4.53238 16.0923 2.76482C14.3248 0.997261 11.9283 0.00294898 9.42858 0ZM9.42858 12.8571C8.75047 12.8571 8.08759 12.6561 7.52377 12.2793C6.95994 11.9026 6.52049 11.3671 6.26099 10.7406C6.00149 10.1141 5.9336 9.42477 6.06589 8.75969C6.19818 8.09461 6.52472 7.4837 7.00422 7.00421C7.48371 6.52471 8.09462 6.19817 8.7597 6.06588C9.42478 5.93359 10.1141 6.00148 10.7406 6.26098C11.3671 6.52048 11.9026 6.95993 12.2793 7.52376C12.6561 8.08759 12.8572 8.75046 12.8572 9.42857C12.856 10.3375 12.4944 11.2089 11.8517 11.8517C11.209 12.4944 10.3375 12.856 9.42858 12.8571Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                    <span className="flex-grow truncate">Delhi, India</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Footer Bottom --> */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-700">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            Lumina © All rights reserved 2025
                        </p>
                        {/* <!-- Social Icons --> */}
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Appbar;
