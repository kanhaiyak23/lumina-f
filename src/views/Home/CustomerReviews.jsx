import React from "react";
import customer1 from "../../assets/reviews/customer1.svg";
import customer2 from "../../assets/reviews/customer2.svg";
import customer3 from "../../assets/reviews/customer3.svg";
import { ReactComponent as StarIcon } from "../../assets/reviews/star.svg";
import { ReactComponent as VectorIcon } from "../../assets/reviews/Vector.svg";

const CustomerReviews = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            image: customer1,
            review: "Absolutely love the quality of Lumina's clothing! The fabrics are premium, the fit is perfect, and the designs are timeless. I've received so many compliments on my new wardrobe!",
        },
        {
            id: 2,
            name: "Michael Chen",
            image: customer2,
            review: "Shopping at Lumina has been a game-changer. The attention to detail in every piece is remarkable, and the customer service is exceptional. Fast shipping and beautiful packaging too!",
        },
        {
            id: 3,
            name: "Emma Williams",
            image: customer3,
            review: "I'm impressed by Lumina's commitment to sustainable fashion. The clothes are not only stylish but also eco-friendly. It feels good to look good while supporting ethical practices!",
        },
    ];

    // Function to render 5 stars
    const renderStars = () => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                    <StarIcon key={index} className="w-6 h-6 text-[#FFCE31]" />
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
            {/* Heading */}
            <div className="flex justify-center mb-16">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Customer Reviews
                </h2>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map(review => (
                    <div
                        key={review.id}
                        className="bg-white rounded-[32px] p-8 border-2 border-purple-500 relative min-h-[500px] flex flex-col shadow-lg hover:shadow-xl transition-shadow"
                    >
                        {/* Customer Image */}
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src={review.image}
                                alt={review.name}
                                className="w-24 h-24 rounded-full mb-4 border-4 border-purple-200"
                            />
                            <h3 className="font-semibold text-2xl text-gray-800">{review.name}</h3>
                        </div>

                        {/* Review Text */}
                        <p className="text-[#767676] font-['Plus_Jakarta_Sans'] font-normal text-[22px] leading-[36px] tracking-[0] text-center mb-8 flex-grow">
                            "{review.review}"
                        </p>

                        {/* Bottom Section with Stars and Vector */}
                        <div className="flex justify-between items-center">
                            {renderStars()}
                            <VectorIcon className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;
