import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../../supabaseClient";
import { setUserData } from "../../Redux Store/Slices/auth";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import DragAndDrop from "./DragAndDrop";
import { Upload, Eye, EyeOff } from "lucide-react";
import selectedAddressId from "../../Redux Store/Slices/cart";

const ProfilePage = () => {
    const dispatch = useDispatch();

    // Fetching user & address data from Redux store
    const { isAuthenticated, user, isDirty } = useSelector(state => state.auth);
    const addresses = useSelector(state => state.cart.addresses);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId) || addresses[0];

    const [formData, setFormData] = useState({
        full_name: user?.name || "",
        email: user?.email || "",
        mobile_number: user?.mobile_number || "",
        address: addresses[0]?.address || "",
        city: addresses[0]?.city || "",
        state: addresses[0]?.state || "",
        pincode: addresses[0]?.pincode || "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user?.name || "",
                email: user?.email || "",
                mobile_number: user?.mobile_number || "",
                address: addresses[0]?.address || "",
                city: addresses[0]?.city || "",
                state: addresses[0]?.state || "",
                pincode: addresses[0]?.pincode || "",
            });
        }
    }, [user, addresses]);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Update User Table in Supabase
            const { error: userUpdateError } = await supabase
                .from("user")
                .update({
                    full_name: formData.name,
                    mobile_number: formData.mobile_number,
                })
                .eq("id", user.id);

            if (userUpdateError) throw userUpdateError;

            // Update Address Table in Supabase
            const { error: addressUpdateError } = await supabase
                .from("address")
                .update({
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                })
                .eq("user_id", user.id);

            if (addressUpdateError) throw addressUpdateError;

            // Update Redux Store
            dispatch(setUserData({ ...user, ...formData }));

            alert("Profile updated successfully!");
        } catch (err) {
            setError(err.message || "An error occurred while updating profile");
        } finally {
            setLoading(false);
        }
    };
    const handleImageChange = files => {
        if (files.length > 0) {
            const imageUrl = URL.createObjectURL(files[0]);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="main-content-container mx-auto">
                <nav className="flex mb-8 text-gray-500" aria-label="Breadcrumb">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">Profile</span>
                </nav>

                <div className="bg-white rounded-lg shadow p-6 sm:p-8 ">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile</h1>

                    <div className="flex  gap-8 mb-4 border-b pb-4 ">
                        <div className="relative   shadow-[0_0_25px_10px_rgba(255,255,255,0.8)] bg-black  rounded-full border ">
                            <img
                                src={user.profileImage || profileImage}
                                alt="Profile Image"
                                className="w-32 h-32 rounded-full object-cover "
                            />
                        </div>

                        <div>
                            <h2 className="text-xl text-[#343434] font-semibold whitespace-nowrap">{`${user.name.split(" ")[0]} ${user.name.split(" ")[1] ? user.name.split(" ")[1][0] + "." : ""}`}</h2>
                            <p className="text-black text-sm font-semibold">
                                {addresses[0]?.address}
                            </p>
                            <p className="text-black text-sm font-semibold">{`${addresses[0]?.city}, ${addresses[0]?.pincode}`}</p>
                        </div>
                        <div className="h-28">
                            <DragAndDrop onChange={handleImageChange} />
                        </div>
                        <div className="w-[40%]">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                value={user.email}
                                // onChange={e => handleInputChange("email", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-7 ">
                            <div>
                                <label className="block text-base font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={e =>
                                        setFormData({ ...formData, full_name: e.target.value })
                                    }
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-medium text-gray-700">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.middleName}
                                    // onChange={e => handleInputChange("middleName", e.target.value)}
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    // onChange={e => handleInputChange("lastName", e.target.value)}
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-medium text-gray-700">
                                    Contact
                                </label>
                                <input
                                    type="tel"
                                    value={formData.mobile_number}
                                    onChange={e =>
                                        setFormData({ ...formData, mobile_number: e.target.value })
                                    }
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-7 border-b pb-4 mt-4">
                            <div className="col-span-2">
                                <label className="block text-base font-medium text-gray-700">
                                    Address
                                </label>
                                <textarea
                                    value={formData.address}
                                    onChange={e =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                    rows={1}
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-medium text-gray-700">
                                    Town
                                </label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={e =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700">
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={e =>
                                        setFormData({ ...formData, state: e.target.value })
                                    }
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700">
                                    Postcode
                                </label>
                                <input
                                    type="text"
                                    value={formData.pincode}
                                    onChange={e =>
                                        setFormData({ ...formData, pincode: e.target.value })
                                    }
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        {/* <hr className="border-r-2  w-[100%] ml-2 mt-2 border-[#DEE4ED]" /> */}

                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                                Password
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                        {error && <div className="text-red-600 text-[12px]">{error}</div>}

                        <div className="flex gap-4 pt-4">
                            <CustomButton
                                variant="outline"
                                label="Cancel"
                                onClick={() =>
                                    setFormData({
                                        full_name: user?.full_name || "",
                                        email: user?.email || "",
                                        mobile_number: user?.mobile_number || "",
                                        address: addresses?.address || "",
                                        city: addresses?.city || "",
                                        state: addresses?.state || "",
                                        pincode: addresses?.pincode || "",
                                    })
                                }
                                className="px-6 text-[12px]"
                            />
                            <CustomButton
                                variant="lightgreen"
                                label={loading ? "Saving..." : "Save Changes"}
                                type="submit"
                                disabled={loading}
                                className="px-6 text-[12px]"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
