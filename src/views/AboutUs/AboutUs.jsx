import React from "react";

const About = () => {
    const features = [
        {
            icon: "👗",
            title: "Premium Quality",
            description:
                "Every piece in our collection is crafted from the finest materials, ensuring durability, comfort, and timeless style that lasts season after season.",
        },
        {
            icon: "🌿",
            title: "Sustainable Fashion",
            description:
                "We're committed to ethical production practices and eco-friendly materials, creating fashion that's kind to both you and the planet.",
        },
        {
            icon: "✨",
            title: "Curated Collections",
            description:
                "Our expert stylists handpick each item to bring you the latest trends and classic pieces that elevate your wardrobe effortlessly.",
        },
        {
            icon: "🚚",
            title: "Fast Delivery",
            description:
                "Get your favorite styles delivered to your doorstep quickly with our reliable shipping partners, ensuring you look great without the wait.",
        },
        {
            icon: "💎",
            title: "Exclusive Designs",
            description:
                "Discover unique pieces you won't find anywhere else, designed by emerging and established fashion designers from around the world.",
        },
        {
            icon: "🎯",
            title: "Perfect Fit Guarantee",
            description:
                "With our detailed size guides and easy returns, we ensure you find the perfect fit every time you shop with Lumina.",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Who We Are Section */}
            <div className="main-content-container py-16">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                    Who We Are
                </h2>

                {/* Content Section */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-stretch">
                    {/* Image Section */}
                    <div className="w-full md:w-1/3">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
                            alt="Fashion collection"
                            className="rounded-3xl w-full h-48 md:h-full object-cover"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="w-full md:w-2/3 space-y-4 md:space-y-6">
                        <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-[#767676]">
                            At Lumina, we believe fashion is more than just clothing—it's a form of self-expression,
                            confidence, and individuality. Founded with a passion for style and quality, we curate
                            collections that blend contemporary trends with timeless elegance, ensuring you always
                            look and feel your best.
                        </p>
                        <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-[#767676]">
                            Our journey began with a simple vision: to make premium fashion accessible to everyone.
                            We partner with ethical manufacturers and sustainable suppliers to bring you clothing
                            that not only looks good but also aligns with your values. From everyday essentials to
                            statement pieces, every item is thoughtfully selected to enhance your wardrobe.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Vision Section */}
            <div className="main-content-container mx-auto py-12 md:py-16">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                    Our Vision
                </h2>

                {/* Content Section */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-24 md:content-start items-stretch lg:gap-12">
                    {/* Image Section */}
                    <div className="w-full md:w-1/3 flex">
                        <img
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
                            alt="Sustainable fashion"
                            className="rounded-2xl w-full h-48 md:h-52 xl:h-60 object-cover"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="w-full md:w-2/3 flex content-start flex-1 items-center">
                        <p className="text-base font-normal sm:text-lg md:text-xl xl:text-xl 2xl:text-2xl text-gray-600">
                            We envision a world where fashion is sustainable, inclusive, and empowering. At Lumina,
                            we're committed to reducing our environmental footprint while celebrating diversity in
                            style. Our mission is to inspire confidence through clothing that fits every body, every
                            style, and every occasion—creating a fashion-forward future that's accessible to all.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="main-content-container mx-auto py-8 sm:py-12">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
                    Why Choose Lumina
                </h2>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-purple-100 md:w-[91%]"
                        >
                            <div className="flex flex-col items-center text-center h-full">
                                {/* Icon */}
                                <div className="text-5xl mb-4">
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
