import React from "react";

const HeroSection = ({ title, image }) => {
    return (
        <section className="w-full h-full bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="flex w-full h-full">
                <div className="flex-1 h-auto flex flex-col justify-center items-center py-10">
                    <div
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl 
                        leading-[2rem] sm:leading-[2.5rem] md:leading-[2.875rem] lg:leading-[2.875rem] 
                        -mb-6 sm:-mb-10 md:-mb-14 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold"
                    >
                        {title}
                    </div>

                    {/* Background Title */}
                    <div
                        className="text-[3rem] sm:text-[4.5rem] md:text-[6.25rem] lg:text-[6.25rem] xl:text-[6.25rem] 
                        leading-[4rem] sm:leading-[6rem] md:leading-[10rem] lg:leading-[10rem] xl:leading-[10rem]
                        font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent text-center opacity-[10%] whitespace-nowrap"
                    >
                        {title}
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center w-full">
                    <img
                        src={image}
                        alt="herosection"
                        className="w-full h-full sm:w-auto sm:h-auto object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
