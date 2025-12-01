import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import { MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux Store/Slices/auth";
import { selectAddress } from "../../Redux Store/Slices/cart";

const AddressForm = ({ onSuccess, onCancel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const existingAddress = location.state?.existingAddress || null;
    const [formData, setFormData] = React.useState(
        existingAddress || {
            full_name: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            is_default: false,
            mobile_number: "",
        },
    );
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        if (existingAddress) {
            setFormData(existingAddress);
        }
    }, [existingAddress]);
    const user = useSelector(state => state.auth.user);
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const addressData = {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                mobile_number: formData.mobile_number,
                user_id: user.id,
            };
            let addressId = existingAddress?.id;

            //updating user mobile number if it not in database
            if (!user.mobile_number) {
                const { error: userUpdateError } = await supabase
                    .from("user")
                    .update({ mobile_number: formData.mobile_number })
                    .eq("id", user.id);

                if (userUpdateError) throw userUpdateError;
                dispatch(setUserData({ ...user, mobile_number: formData.mobile_number }));
            }

            if (existingAddress?.id) {
                const { error } = await supabase
                    .from("address")
                    .update(addressData)
                    .eq("id", existingAddress.id);
                if (error) throw error;
            } else {
                const { data, error } = await supabase
                    .from("address")
                    .insert([addressData])
                    .select("*");
                if (error) throw error;

                addressId = data[0]?.id;
            }
            console.log(formData.is_default && addressId);
            if (formData.is_default && addressId) {
                console.log(addressId);
                dispatch(selectAddress(addressId));
            }

            onSuccess?.();
            navigate("/cart");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-20">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#04A42A]" />
                    {existingAddress ? "Edit Address" : "Add New Address"}
                </h2>

                {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={e =>
                                    setFormData({ ...formData, full_name: e.target.value })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Street Address
                            </label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={e =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={e =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={e =>
                                        setFormData({ ...formData, state: e.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={formData.pincode}
                                    onChange={e =>
                                        setFormData({ ...formData, pincode: e.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={formData.mobile_number}
                                    onChange={e =>
                                        setFormData({ ...formData, mobile_number: e.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_default"
                                checked={formData.is_default}
                                onChange={e =>
                                    setFormData({ ...formData, is_default: e.target.checked })
                                }
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="is_default"
                                className="ml-2 block text-sm text-gray-700"
                            >
                                Set as default address
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end">
                        <CustomButton
                            variant="outline"
                            label="Cancel"
                            type="button"
                            onClick={() => {
                                if (onCancel) {
                                    onCancel();
                                } else {
                                    navigate("/cart");
                                }
                            }}
                            className="px-6"
                        />
                        <CustomButton
                            variant="lightgreen"
                            label={loading ? "Saving..." : "Save Address"}
                            type="submit"
                            disabled={loading}
                            className="px-6"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;

// "use client"

// import { useState, useEffect } from "react"
// import CustomButton from "../../components/common/CustomButton/CustomButton"

// const AddressForm = ({ initialValues = {}, onSubmit, isSubmitting = false, submitButtonText = "Save Address" }) => {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     mobile_number: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     ...initialValues,
//   })

//   const [errors, setErrors] = useState({})

//   useEffect(() => {
//     if (initialValues) {
//       setFormData({
//         full_name: "",
//         mobile_number: "",
//         address: "",
//         city: "",
//         state: "",
//         pincode: "",
//         ...initialValues,
//       })
//     }
//   }, [initialValues])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     // Clear error when user types
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.full_name.trim()) {
//       newErrors.full_name = "Full name is required"
//     }

//     if (!formData.mobile_number.trim()) {
//       newErrors.mobile_number = "Mobile number is required"
//     } else if (!/^\d{10}$/.test(formData.mobile_number)) {
//       newErrors.mobile_number = "Mobile number must be 10 digits"
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = "Address is required"
//     }

//     if (!formData.city.trim()) {
//       newErrors.city = "City is required"
//     }

//     if (!formData.state.trim()) {
//       newErrors.state = "State is required"
//     }

//     if (!formData.pincode.trim()) {
//       newErrors.pincode = "Pincode is required"
//     } else if (!/^\d{6}$/.test(formData.pincode)) {
//       newErrors.pincode = "Pincode must be 6 digits"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (validateForm()) {
//       onSubmit(formData)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
//             Full Name*
//           </label>
//           <input
//             type="text"
//             id="full_name"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
//               errors.full_name ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
//         </div>

//         <div>
//           <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-1">
//             Mobile Number*
//           </label>
//           <input
//             type="text"
//             id="mobile_number"
//             name="mobile_number"
//             value={formData.mobile_number}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
//               errors.mobile_number ? "border-red-500" : "border-gray-300"
//             }`}
//             maxLength={10}
//           />
//           {errors.mobile_number && <p className="mt-1 text-sm text-red-600">{errors.mobile_number}</p>}
//         </div>
//       </div>

//       <div>
//         <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//           Address (House No, Building, Street, Area)*
//         </label>
//         <textarea
//           id="address"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           rows={3}
//           className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
//             errors.address ? "border-red-500" : "border-gray-300"
//           }`}
//         />
//         {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
//             City*
//           </label>
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
//               errors.city ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
//         </div>

//         <div>
//           <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
//             State*
//           </label>
//           <input
//             type="text"
//             id="state"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
//               errors.state ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
//         </div>

//         <div>
//           <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
//             Pincode*
//           </label>
//           <input
//             type="text"
//             id="pincode"
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
//               errors.pincode ? "border-red-500" : "border-gray-300"
//             }`}
//             maxLength={6}
//           />
//           {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
//         </div>
//       </div>

//       <div className="flex justify-end pt-4">
//         <CustomButton
//           type="submit"
//           variant="lightgreen"
//           label={submitButtonText}
//           disabled={isSubmitting}
//           className="w-full sm:w-auto"
//         />
//       </div>
//     </form>
//   )
// }

// export default AddressForm
