import React from "react";
import LoaderWebp from "../assets/loading.webp";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserData } from "../Redux Store/Slices/auth";
import { setAddresses } from "../Redux Store/Slices/cart";
import { addressService } from "../Services/address.services";

const Loading = () => {
    const { show, title } = useSelector(ctx => ctx.loader);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem("user_data");
        console.log(storedUser);
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser);
            dispatch(setUserData(JSON.parse(storedUser)));
            fetchAddresses(parsedUser.id);
        }
    }, [dispatch]);

    const fetchAddresses = async userId => {
        if (!userId) return;

        try {
            const data = await addressService.fetchAddresses(userId);
            if (data && data.length > 0) {
                dispatch(setAddresses(data));
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    if (show)
        return (
            <div className="fixed w-full h-screen bg-[#000000c4] z-[9999] grid place-content-center">
                <div className="flex gap-4 flex-col items-center">
                    <img src={LoaderWebp} className="w-14 h-14" alt="data is loading...." />
                    {title && <p className="text-white">{title}</p>}
                </div>
            </div>
        );
};

export default Loading;
