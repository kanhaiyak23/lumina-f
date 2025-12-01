import React from "react";
import Main from "./Main";
import About from "./AboutUs";
import CustomerReviews from "./CustomerReviews";
import Products from "./ExploreProducts";
import Subscribe from "./Subscribe";

export const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero/Main Section */}
            <Main />

            {/* About Us Section */}
            <About />

            {/* Products Section */}
            <Products />

            {/* Customer Reviews Section */}
            <CustomerReviews />

            {/* Subscribe Section */}
            <Subscribe />
        </div>
    );
};
