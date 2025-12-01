import React from "react";
import Breadcrumb from "../../components/common/Breadcumb";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import ShoppingCart from "../../assets/emptyCart.svg";
import HeroSection from "../herosection/herosection";
import HeroSectionCart from "../../assets/ProductPage/productHero1.webp";
const EmptyCart = () => {
    return (
        <div className="min-h-screen  ">
            <div className="  w-full ">
                <HeroSection title="Cart" image={HeroSectionCart} />
            </div>
            <div className="main-content-container mx-auto ">
                {/* <Breadcrumb currentPage="Cart" /> */}
                <div className="p-10">
                    <Breadcrumb
                        breadcrumbs={[
                            { label: "Home", url: "/" },
                            { label: "Shop", url: "/shop" },
                            { label: "Cart", url: "/cart" },
                        ]}
                    />
                </div>

                <div className="sm:mt-12 flex flex-col items-center w-full h-full justify-center sm:gap-[22px] sm:py-[10px]">
                    <div className="bg-white  rounded-lg  w-full h-full  text-center py-[10px] gap-[22px]">
                        <div className=" mx-auto mb-6  rounded-full w-full h-full flex items-center justify-center">
                            <img
                                src={ShoppingCart}
                                alt="Empty Cart"
                                className="  w-auto h-auto  text-gray-400"
                            />
                        </div>

                        <h2 className=" text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
                            Your Cart Is Empty
                        </h2>

                        <p className="text-[#4D4D4D] text-xl font-normal mt-8 mb-4">
                            Add products to the cart
                        </p>

                        <div className="space-x-4 flex justify-center content-center ">
                            <CustomButton
                                label="Login"
                                variant="lightgreen"
                                className=" bg-[#04A42A] !w-28 !h-10"
                                onClick={() => {}}
                            />

                            <CustomButton
                                label="Register"
                                variant="lightgreen"
                                className=" bg-[#04A42A] !w-28 !h-10"
                                onClick={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EmptyCart;
