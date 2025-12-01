import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import CustomTextInput from "../../../components/common/CustomTextInput";
import { successToast, errorToast } from "../../../../src/utils/toasts";
import "react-toastify/dist/ReactToastify.css";
import mailImage from "../../../assets/login/Mail.svg";
import forgotPasswordImage from "../../../assets/login/forgotPass.svg";
import { supabase } from "../../../supabaseClient";

const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

const ForgotPasswordEmail = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        const { email } = values;

        try {
            // first check if the email exists in the database
            // Check if the email exists in Supabase's auth.users table
            const { data, error: userError } = await supabase
                .from("user")
                .select("id")
                .eq("email", email)
                .single();

            if (userError || !data) {
                errorToast("Email not found. Please register first.");
                return;
            }

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "http://localhost:3000/forgotPasswordreset", // Update with your reset password page URL
            });

            if (error) throw error;

            successToast("Password reset email sent! Check your inbox.");
        } catch (error) {
            errorToast(error.message || "Failed to send reset email.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center sm:p-4">
            <div className="main-content-container flex flex-col sm:flex-row w-full items-center justify-between">
                <div className="w-full sm:w-[40%] hidden sm:block">
                    <img src={forgotPasswordImage} alt="Register" className="w-full h-auto" />
                </div>
                <div
                    className="w-full sm:w-[55%] space-y-6 bg-white p-6 sm:p-10 rounded-xl  border border-r-[1px] border-l-[1px] "
                    style={{
                        borderImageSource:
                            "linear-gradient(to bottom, white, #D6D5D5, #908F8F, white)",
                        borderImageSlice: 1,
                    }}
                >
                    {/* Headline */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Forgot Your Password?
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Please enter your registered email ID. We will send a verification code to
                        your registered email ID.
                    </p>

                    {/* Formik Form */}
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={emailSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <CustomTextInput
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    startIcon={
                                        <img
                                            src={mailImage}
                                            alt="Mail Icon"
                                            className="w-5 h-5 text-gray-400"
                                        />
                                    }
                                    autoComplete="email"
                                />

                                {/* Next Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#04A42A] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                >
                                    {isSubmitting ? "Sending..." : "Next"}
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

export default ForgotPasswordEmail;
