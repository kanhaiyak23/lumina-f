import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhoneRequired, setUserData } from "../../Redux Store/Slices/auth";
import { supabase } from "../../supabaseClient";
import { motion } from "framer-motion";

const PhoneInputComponent = () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const phoneRequired = useSelector(state => state.auth.phoneRequired);

    if (!phoneRequired) return null; // Hide input if phone is not required

    // ✅ Function to validate phone input
    const validatePhone = input => {
        if (!/^\d+$/.test(input)) return "Only numbers are allowed.";
        if (input.length < 10) return "Phone number must be exactly 10 digits.";
        if (input.length > 10) return "Phone number cannot exceed 10 digits.";
        return "";
    };

    const handleChange = e => {
        const input = e.target.value.replace(/\D/g, ""); // Allow only numbers
        setPhone(input);
        setError(validatePhone(input)); // Validate as user types
    };

    const handlePhoneSubmit = async () => {
        if (!user || !phone) return;

        const { error } = await supabase
            .from("user")
            .update({ mobile_number: phone })
            .eq("id", user.id);

        if (error) {
            console.error("Error updating phone:", error);
            setError("Failed to update phone number. Try again.");
            return;
        }

        dispatch(setUserData({ ...user, phone })); // Update Redux store
        dispatch(setPhoneRequired(false)); // Hide phone input after success
    };

    const handleSubmit = () => {
        const validationError = validatePhone(phone);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError(""); // Clear errors if valid
        handlePhoneSubmit(); // Submit phone number to Supabase
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg w-96 text-center"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Please enter your phone number:
                </h2>
                <input
                    type="text"
                    value={phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}{" "}
                {/* ✅ Show validation errors */}
                <motion.button
                    onClick={handleSubmit}
                    disabled={!!error || phone.length !== 10}
                    whileHover={{ scale: phone.length === 10 ? 1.05 : 1 }}
                    whileTap={{ scale: phone.length === 10 ? 0.95 : 1 }}
                    className={`mt-4 w-full py-2 rounded-lg shadow-md font-semibold transition 
                        ${phone.length === 10 && !error ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                    `}
                >
                    Submit
                </motion.button>
            </motion.div>
        </div>
    );
};

export default PhoneInputComponent;
