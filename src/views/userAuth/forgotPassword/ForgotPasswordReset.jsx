import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import CustomTextInput from "../../../components/common/CustomTextInput";
import { successToast, errorToast } from "../../../../src/utils/toasts";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import lockImage from "../../../assets/login/password.svg";
import forgotPasswordImage from "../../../assets/login/forgotPass.svg";
import { supabase } from "../../../supabaseClient";
import { useNavigate } from "react-router-dom";

const passwordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Re-entering password is required"),
});

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                errorToast("Invalid or expired reset link.");
                setIsTokenValid(false);
                setTimeout(() => navigate("/forgotPasswordEmail"), 3000); // Redirect to forgot password page
            }
        };
        checkAuth();
    }, [navigate]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setLoading(true);
            const { password } = values;

            const { error } = await supabase.auth.updateUser({ password });

            if (error) throw error;

            successToast("Password changed successfully! Redirecting to login...");
            setTimeout(() => navigate("/userLogin"), 2000);
        } catch (error) {
            errorToast(error.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    if (!isTokenValid) {
        return (
            <h2 className="text-center text-red-600">Invalid or Expired Link. Redirecting...</h2>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center sm:p-4">
            <div className="main-content-container flex flex-col sm:flex-row w-full items-center justify-between">
                <div className="w-full sm:w-[40%] hidden sm:block">
                    <img src={forgotPasswordImage} alt="Reset Password" className="w-full h-auto" />
                </div>

                <div className="w-full sm:w-[55%] space-y-6 bg-white p-6 sm:p-10 rounded-xl border border-gray-300">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Reset Your Password
                    </h2>
                    <p className="text-gray-600 text-sm">Please enter your new password.</p>

                    <Formik
                        initialValues={{ password: "", confirmPassword: "" }}
                        validationSchema={passwordSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <CustomTextInput
                                    name="password"
                                    label="New Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your new password"
                                    required
                                    startIcon={
                                        <img src={lockImage} alt="Lock Icon" className="w-5 h-5" />
                                    }
                                    endIcon={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-green-600" />
                                            )}
                                        </button>
                                    }
                                />

                                <CustomTextInput
                                    name="confirmPassword"
                                    label="Re-enter New Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-Enter your new password"
                                    required
                                    startIcon={
                                        <img src={lockImage} alt="Lock Icon" className="w-5 h-5" />
                                    }
                                    endIcon={
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-green-600" />
                                            )}
                                        </button>
                                    }
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting || loading}
                                    className={`w-full sm:w-[30%] py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 ${
                                        isSubmitting || loading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {isSubmitting || loading ? "Changing..." : "Change Password"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default ResetPassword;
