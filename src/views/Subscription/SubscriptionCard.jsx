import React from "react";

import { AlertTriangle } from "lucide-react";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { subscribeToPlan, cancelSubscription } from "../../Redux Store/Slices/subscriptionsSlice";

const SubscriptionCard = ({ plan }) => {
    const dispatch = useDispatch();

    // Get user subscriptions from Redux store
    const userSubscriptions = useSelector(state => state.subscriptions.userSubscriptions);

    // Check if the current plan is active by comparing IDs
    const isActive = userSubscriptions.some(subscription => subscription.id === plan.id);

    const handleSubscribe = () => {
        dispatch(subscribeToPlan(plan));
    };

    const handleCancel = () => {
        dispatch(cancelSubscription(plan.id));
    };
    return (
        <div
            className={`rounded-lg p-6 border border-[] ${isActive ? "bg-[#EDFFE1] border border-[#46E76B] relative" : "bg-[#EFEFEF]"}`}
        >
            {isActive && (
                <div className="absolute top-6 right-0">
                    <span className=" bg-[#04A429] px-2 py-1 text-xs font-medium text-white">
                        ACTIVE PLAN
                    </span>
                </div>
            )}
            <h3 className="text-2xl font-semibold text-[#04A429]">{plan.title}</h3>
            <p className="mt-4 text-gray-600">{plan.description}</p>

            <div className="mt-6 space-y-3">
                <div className="flex gap-2">
                    <span className="font-bold text-base">Type:</span>
                    <span className="text-gray-600 text-base">{plan.frequency}</span>
                </div>

                <div className="flex gap-2">
                    <span className="font-bold text-base">Microgreens:</span>
                    <span className="text-gray-600 text-base whitespace-nowrap truncate">
                        {plan.microgreens.join(", ")}
                    </span>
                </div>

                <div className="flex gap-2">
                    <span className="font-bold text-base">Size:</span>
                    <span className="text-gray-600 text-base">{plan.size}</span>
                </div>
            </div>

            <div className="mt-6">
                <span className="text-xl font-semibold text-[#04A429]">Price: {plan.price}₹</span>
            </div>
            {isActive && (
                // plan.paymentDueDate
                <div className="mt-4">
                    <span className="font-medium">Payment due date: </span>
                    <span className="text-gray-600">{/* {plan.paymentDueDate} */}7</span>
                </div>
            )}

            <div className="mt-2  flex items-center">
                {isActive ? (
                    <CustomButton
                        label="CANCEL"
                        variant="outlined"
                        className="!w-full"
                        size="md"
                        onClick={handleCancel}
                    />
                ) : (
                    <CustomButton
                        label="SUBSCRIBE"
                        variant="lightgreen"
                        className="!w-full"
                        size="md"
                        onClick={handleSubscribe}
                    />
                )}
            </div>
        </div>
    );
};

export default SubscriptionCard;
