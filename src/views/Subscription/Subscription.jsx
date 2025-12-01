import React from "react";
import SubscriptionCard from "./SubscriptionCard";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setUserSubscriptions,
    setAvailableSubscriptions,
    setLoading,
    setError,
} from "../../Redux Store/Slices/subscriptionsSlice";
import { showLoader, hideLoader } from "../../utils/loader";
import {
    fetchAvailableSubscriptions,
    fetchUserSubscriptions,
} from "../../Services/subscription.service";
import { __showLoader, __hideLoader } from "../../Redux Store/Slices/loader";

function Subscription() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { userSubscriptions, availableSubscriptions, loading } = useSelector(
        state => state.subscriptions,
    );
    const hasActiveSubscription = userSubscriptions.length > 0;
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.id) {
                    dispatch(__showLoader("Loading subscription..."));
                    const userData = await fetchUserSubscriptions(user.id);
                    dispatch(setUserSubscriptions(userData));
                }

                const availableData = await fetchAvailableSubscriptions();
                dispatch(setAvailableSubscriptions(availableData));
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(__hideLoader());
            }
        };

        fetchData();
    }, [dispatch, user?.id]);

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
                <nav className="mb-8 flex items-center gap-2 text-gray-600">
                    <a href="#" className="hover:text-gray-900">
                        Home
                    </a>
                    <span>&gt;</span>
                    <span className="text-gray-900">Subscription</span>
                </nav>

                <div className="space-y-8 border rounded-2xl pt-6 pr-4 pb-6 pl-4">
                    <h1 className="text-2xl font-bold text-gray-900">My subscription</h1>

                    {!hasActiveSubscription && (
                        <div className="rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-center gap-4">
                                <AlertTriangle className="h-8 w-8 text-amber-500" />
                                <div>
                                    <h2 className="text-xl font-bold">
                                        NO SUBSCRIPTION PURCHASED YET
                                    </h2>
                                    <p className="text-[#04A429] font-bold">
                                        Please Subscribe One From The Following List.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {availableSubscriptions.map((plan, index) => (
                            <SubscriptionCard key={index} plan={plan} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
