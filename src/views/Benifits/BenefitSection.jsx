import React from "react";

const BenefitSection = ({ title, data }) => {
    return (
        <div className="flex flex-col items-center max-h-full rounded-3xl border-solid border border-gray-500 mt-8 md:mt-12 md:mx-12 p-4 md:p-6">
            <h1 className="font-semibold text-3xl md:text-4xl text-center">{title}</h1>

            <div className="flex flex-col md:flex-row justify-around w-full mt-6 md:mt-12 gap-8 md:gap-4">
                {data.map(item => (
                    <div key={item.id} className="flex flex-col items-center">
                        <img
                            src={item.img}
                            alt=""
                            className="rounded-full border border-green-500 w-24 h-24 md:w-32 md:h-32 bg-green-100"
                        />
                        <h4 className="text-xl md:text-2xl mt-3 text-center font-medium">
                            {item.text}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BenefitSection;
