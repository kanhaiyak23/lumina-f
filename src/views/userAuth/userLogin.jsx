import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import CustomTextInput from "../../components/common/CustomTextInput";
import { successToast, errorToast } from "../../utils/toasts";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../../assets/login/login.svg";
import mailImage from "../../assets/login/Mail.svg";
import lockImage from "../../assets/login/password.svg";
import { authService } from "../../Services/auth.service";
import { setToastMessage, setUserData } from "../../Redux Store/Slices/auth";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(50, "Password must not exceed 50 characters.")
        .required("Password is required.")
        // .test(
        //     "uppercase",
        //     "Password must contain at least one uppercase letter.",
        //     value => /[A-Z]/.test(value) || !value,
        // )
        .test(
            "lowercase",
            "Password must contain at least one lowercase letter.",
            value => /[a-z]/.test(value) || !value,
        )
        .test(
            "number",
            "Password must contain at least one number.",
            value => /\d/.test(value) || !value,
        )
        .test(
            "specialCharacter",
            "Password must contain at least one special character (@$!%*#?&).",
            value => /[@$!%*#?&]/.test(value) || !value,
        ),
});

function UserLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const redirectUrl = searchParams.get("redirect") || "/";
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await authService.login(values);

            if (response.success) {
                // console.log(response.data)
                dispatch(setUserData(response.data));
                dispatch(setToastMessage(response.message));
                // successToast(response.message);
                resetForm();
                setTimeout(() => {
                    navigate(redirectUrl); // ✅ Delay navigation slightly
                }, 2000);

                // if (redirectUrl) {

                //     setTimeout(() => {
                //         navigate(redirectUrl); // ✅ Delay navigation slightly
                //     }, 200);

                //     // successToast(response.message); // Show toast first

                // }
            } else {
                dispatch(setToastMessage(response.message));
                // errorToast(response.message);
            }
        } catch (error) {
            console.error("Login in error:", error);
            errorToast(
                error instanceof Error ? error.message : "Login in failed. Please try again.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center  justify-center sm:p-4">
            <div className="main-content-container flex flex-col sm:flex-row  w-full  items-center justify-between">
                {/* Image Section (Hidden on Small Screens) */}
                <div className="w-full sm:w-[40%] hidden sm:block">
                    <img src={loginImage} alt="Workflow" className="w-full h-auto" />
                </div>

                {/* Login Form Section */}
                <div
                    className="w-full sm:w-[55%] space-y-8 bg-white p-6 sm:p-14 rounded-xl border border-l-[1px] border-r-[1px] "
                    style={{
                        borderImageSource:
                            "linear-gradient(to bottom, white, #D6D5D5, #908F8F, white)",
                        borderImageSlice: 1,
                    }}
                >
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-left">
                            Login
                        </h2>
                        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg text-left">
                            <p className="text-sm font-semibold text-purple-800 mb-2">Quick Login:</p>
                            <p className="text-sm text-purple-700">Use any email and password to login</p>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-4">

                        {/* Formik Login Form */}
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={loginSchema}
                            onSubmit={handleSubmit}
                            validateOnBlur={false}
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

                                    <CustomTextInput
                                        name="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        required
                                        startIcon={
                                            <img
                                                src={lockImage}
                                                alt="Lock Icon"
                                                className="w-5 h-5 text-gray-400"
                                            />
                                        }
                                        endIcon={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-gray-400 hover:text-gray-500"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5 text-[#04A42A]" />
                                                ) : (
                                                    <Eye className="w-5 h-5 text-[#04A42A]" />
                                                )}
                                            </button>
                                        }
                                        autoComplete="current-password"
                                    />

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 text-[#04A42A] focus:ring-green-500 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-2 block text-sm text-gray-900"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                        <div className="text-sm">
                                            <a
                                                href="/forgotPasswordEmail"
                                                className="font-medium text-purple-600 hover:text-purple-500"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>

                                    {/* Login Button & Register Link */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full sm:w-[40%] flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            {isSubmitting ? "Signing in..." : "Login"}
                                        </button>
                                        <div className="text-center text-sm text-gray-900">
                                            Don't have an account?{" "}
                                            <div
                                                className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
                                                onClick={() => navigate("/userRegister")}
                                            >
                                                Register
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default UserLogin;
