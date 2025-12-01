import React from "react";
import Appbar from "../../components/layout/LayoutWrapper/Appbar";
import Food from "../../assets/food.svg";
import Footer from "../../components/layout/LayoutWrapper/Footer/index";
import BenefitSection from "./BenefitSection";
import Assets from "../../assets/Benefits_Img/image";

function Benefits() {
    const Health = [
        { id: 0, img: Assets[0], text: "Boosts Immunity" },
        { id: 1, img: Assets[1], text: "Improve Digestion" },
        { id: 2, img: Assets[2], text: "Supports Heart Health" },
    ];

    const Elder = [
        { id: 0, img: Assets[3], text: "Children" },
        { id: 1, img: Assets[4], text: "Adults" },
        { id: 2, img: Assets[5], text: "Seniors" },
        { id: 3, img: Assets[6], text: "Fitness Enthusiasts" },
    ];

    const Impact = [
        { id: 0, img: Assets[7], text: "Grown Sustainably" },
        { id: 1, img: "", text: "Minimal Water Usage" },
        { id: 2, img: "", text: "Pesticide-Free" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative max-h-screen/3 max-w-full bg-green-100">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-6 relative">
                    {/* Left side with text */}
                    <div className="relative mb-8 md:mb-0">
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#04A42A] relative z-10 left-4 md:left-20">
                            Benefits
                        </h1>
                        <span className="absolute top-2 md:top-5 text-4xl md:text-6xl lg:text-8xl font-bold text-green-300 opacity-40 -z-0">
                            Benefits
                        </span>
                    </div>

                    {/* Right side with image and shadow */}
                    <div className="relative w-full md:w-1/2 max-w-lg">
                        {/* Shadow of image */}
                        <img
                            src={Food}
                            alt="Food shadow"
                            className="absolute -left-12 md:-left-36 bottom-0 w-2/5 md:w-3/5 h-2/5 md:h-3/5 opacity-30 max-w-[300px]"
                        />
                        {/* Main image */}
                        <img
                            src={Food}
                            alt="Food"
                            className="relative w-3/4 md:w-full h-3/4 md:h-full mt-4 md:mt-7 max-w-[400px] max-h-[320px] object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="flex-grow main-content-container">
                <div className="mx-auto px-4">
                    {/* Navigation */}
                    <div className="max-w-7xl ml-11 h-auto my-6 md:my-8 lg:my-11 flex flex-wrap items-center text-lg md:text-xl">
                        <span className="text-gray-600">Home</span>
                        <span className="mx-2 text-green-custom"> &gt;</span>
                        <span className="text-green-custom">Benefits</span>
                    </div>

                    {/* Benefit Sections */}
                    <div className="space-y-12 md:space-y-16 lg:space-y-20">
                        <BenefitSection title="Health Benefits" data={Health} />
                        <BenefitSection title="Who Can Enjoy" data={Elder} />
                        <BenefitSection title="Environmental Impact" data={Impact} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Benefits;
