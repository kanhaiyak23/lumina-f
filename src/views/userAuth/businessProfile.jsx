import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { businessService } from "../../Services/bussiness.service";
import { setBusinessData, setLoading, setError } from "../../Redux Store/Slices/business";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import DragAndDrop from "./DragAndDrop";
import { Upload, Eye, EyeOff } from "lucide-react";

const BusinessProfile = () => {
    const dispatch = useDispatch();
    const { business, isLoading } = useSelector(state => state.business);

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const [formData, setFormData] = useState({
        name: business?.name || "",
        gstin: business?.gstin || "",
        pan: business?.pan_number || "",
        email: business?.email || "",
        contact: business?.contact_number || "",
        address: business?.address || "",
        city: business?.city || "",
        state: business?.state || "",
        pincode: business?.pincode || "",
    });

    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                dispatch(setLoading(true));
                const businessData = await businessService.fetchBusinessProfile();
                console.log(businessData);
                dispatch(setBusinessData(businessData));
                setFormData({
                    name: businessData.name || "",
                    gstin: businessData.gstin || "",
                    pan: businessData.pan_number || "",
                    email: businessData.email || "",
                    contact: businessData.contact_number || "",
                    address: businessData.address || "",
                    city: businessData.city || "",
                    state: businessData.state || "",
                    pincode: businessData.pincode || "",
                });
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchBusinessData();
    }, [dispatch]);

    useEffect(() => {
        if (business) {
            setFormData({
                name: business.name || "",
                gstin: business.gstin || "",
                pan: business.pan_number || "",
                email: business.email || "",
                contact: business.contact_number || "",
                address: business.address || "",
                city: business.city || "",
                state: business.state || "",
                pincode: business.pincode || "",
            });
        }
    }, [business]);

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const updatedBusiness = await businessService.updateBusinessProfile(
                business.id,
                formData,
            );
            dispatch(setBusinessData(updatedBusiness));
            alert("Business profile updated successfully!");
        } catch (err) {
            dispatch(setError(err.message || "An error occurred while updating profile"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <nav className="flex mb-8 text-gray-500" aria-label="Breadcrumb">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">Business Profile</span>
                </nav>

                <div className="bg-white rounded-lg shadow p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8">Business Profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    GSTIN
                                </label>
                                <input
                                    type="text"
                                    value={formData.gstin}
                                    onChange={e =>
                                        setFormData({ ...formData, gstin: e.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    PAN Number
                                </label>
                                <input
                                    type="text"
                                    value={formData.pan}
                                    onChange={e =>
                                        setFormData({ ...formData, pan: e.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">
                                    Business Email
                                </label>
                                <input
                                    type="text"
                                    value={business?.email}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contact
                                </label>
                                <input
                                    type="tel"
                                    value={formData.contact}
                                    onChange={e =>
                                        setFormData({ ...formData, contact: e.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {business?.subscription_plan && (
                            <div className="mt-6 p-4 bg-green-50 rounded-lg">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">
                                    Current Subscription Plan - "{business.subscription_plan}"
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm text-green-600">
                                    <div>
                                        <span className="font-medium">Type:</span>{" "}
                                        {business.subscription_type}
                                    </div>
                                    <div>
                                        <span className="font-medium">Microgreens:</span>{" "}
                                        {business.microgreens?.join(", ")}
                                    </div>
                                    <div>
                                        <span className="font-medium">Size:</span> {business.size}
                                    </div>
                                    <div>
                                        <span className="font-medium">Payment Due:</span>{" "}
                                        {business.payment_due_date}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                                Change Password
                            </h3>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Old Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter Old Password"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Enter New Password"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showNewPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <CustomButton
                                variant="outline"
                                label="Cancel"
                                onClick={() =>
                                    setFormData({
                                        name: business?.name || "",
                                        gstin: business?.gstin || "",
                                        pan: business?.pan || "",
                                        email: business?.email || "",
                                        contact: business?.contact || "",
                                        address: business?.address || "",
                                        city: business?.city || "",
                                        state: business?.state || "",
                                        pincode: business?.pincode || "",
                                    })
                                }
                                className="px-6 text-[12px]"
                            />
                            <CustomButton
                                variant="lightgreen"
                                label={isLoading ? "Saving..." : "Save Changes"}
                                type="submit"
                                disabled={isLoading}
                                className="px-6 text-[12px]"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;
