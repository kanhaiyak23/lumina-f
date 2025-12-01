import React from "react";

const Loadingbar = ({ isLoading }) => {
    return (
        <>
            {isLoading && (
                <div className="relative w-full h-1 bg-primary-light overflow-hidden rounded-2xl">
                    <div
                        className="absolute top-0 left-0 h-full bg-primary animate-pulse rounded-2xl"
                        style={{
                            width: "100%",
                            animation: "loadingAnimation 2s infinite",
                        }}
                    ></div>
                </div>
            )}
            <style>
                {`
          @keyframes loadingAnimation {
            0% { left: -100%; width: 100%; }
            50% { left: 25%; width: 50%; }
            100% { left: 100%; width: 0; }
          }
        `}
            </style>
        </>
    );
};

export default Loadingbar;
