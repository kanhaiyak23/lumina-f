import React from "react";
import subscribeCard from "../../assets/subscribe/card.svg";

const Subscribe = () => {
    return (
        <section className="relative h-[651px] w-full">
            {/* Background image with overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Dark overlay with purple tint */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80"></div>
            </div>

            {/* Content Container - Centered and overlapping */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
                <div className="bg-white rounded-[20px] max-w-[1000px] mx-auto flex flex-col md:flex-row overflow-hidden shadow-2xl">
                    {/* Left side - Image */}
                    <div className="w-full md:w-2/5">
                        <img
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Subscribe"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right side - Form */}
                    <div className="w-full md:w-3/5 flex items-center justify-center py-16 px-8">
                        <div className="max-w-[610px] w-full">
                            {/* Heading */}
                            <h2 className="text-[32px] font-semibold text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Join Lumina Club
                            </h2>

                            {/* Description */}
                            <p className="font-['Plus_Jakarta_Sans'] text-[22px] leading-[36px] text-[#767676] font-medium mb-12 text-center">
                                Subscribe to receive exclusive fashion updates, early access to new
                                collections, and special member-only discounts!
                            </p>

                            {/* Form */}
                            <div className="max-w-[422px] mx-auto w-full">
                                <div className="space-y-6">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full h-[60px] px-4 rounded-[12px] border border-purple-300 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Enter your e-mail"
                                        className="w-full h-[60px] px-4 rounded-[12px] border border-purple-300 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                                    />
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="w-[206px] h-[50px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-[8px] px-10 py-2.5 hover:shadow-lg transition-all"
                                        >
                                            SUBSCRIBE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;
