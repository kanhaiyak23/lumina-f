import React, { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 3000);
            return () => clearTimeout(timer);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowNotification(true);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <>
            {showNotification && (
                <div
                    className={`fixed top-0 left-0 w-full px-6 py-3 text-center shadow-md transition-all duration-300 z-50 ${
                        isOnline ? "bg-[#04A42A] text-white" : "bg-red-500 text-white"
                    }`}
                >
                    {isOnline ? (
                        <>
                            <Wifi className="inline w-5 h-5 mr-2" />
                            <span className="font-medium">Welcome back! You're online</span>
                        </>
                    ) : (
                        <>
                            <WifiOff className="inline w-5 h-5 mr-2" />
                            <span className="font-medium">No internet connection</span>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

{
    /* Permanent Status Indicator */
}
{
    /* <div className="fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md">
                <div
                    className={`w-2 h-2 rounded-full ${
                        isOnline ? "bg-green-500" : "bg-red-500"
                    }`}
                />
                <span className="text-sm font-medium text-gray-700">
                    {isOnline ? "Connected" : "Offline"}
                </span>
//             </div> */
}
//         </>
//     );
// };

export default NetworkStatus;
