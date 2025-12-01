import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import CustomTextInput from "../../components/common/CustomTextInput";
import { successToast, errorToast } from "../../utils/toasts";
import "react-toastify/dist/ReactToastify.css";
import registerImage from "../../assets/login/signup.svg";
import mailImage from "../../assets/login/Mail.svg";
import lockImage from "../../assets/login/password.svg";
import userImage from "../../assets/login/user.svg";
import phoneImage from "../../assets/login/phone.svg";
import { authService } from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const registerSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact must be a 10-digit number")
        .required("Contact is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(50, "Password must not exceed 50 characters.")
        .required("Password is required.")
        .test(
            "uppercase",
            "Password must contain at least one uppercase letter.",
            value => /[A-Z]/.test(value) || !value,
        )
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

function UserRegister() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    // const projectId = "onwlknutcalenjbfhrhf"
    // const sessionData = localStorage.getItem(`sb-${projectId}-auth-token`)
    // console.log("User session retrieved from local storage:", sessionData);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await authService.register(values);

            if (response.success) {
                successToast(response.message);

                // resetForm();
                //redirect to login page

                navigate("/userLogin");
            } else {
                errorToast(response.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
            errorToast(
                error instanceof Error ? error.message : "Registration failed. Please try again.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center sm:p-4 overflow-auto">
            {/* <div className="hidden sm:block absolute md:left-[45vw] lg:left-[46vw] xl:left-[46vw] 2xl:left-[46vw] top-0 w-[1px] h-full bg-[linear-gradient(to_bottom,white,#D6D5D5,#908F8F,white)]" /> */}
            <div className="main-content-container flex flex-col sm:flex-row w-full items-center justify-between">
                {/* Image Section */}
                <div className="w-full sm:w-[40%] hidden sm:block">
                    <img src={registerImage} alt="Register" className="w-full h-auto" />
                </div>

                {/* Register Form Section */}
                <div
                    className="w-full sm:w-[55%] space-y-8 bg-white p-6 sm:p-14 rounded-xl border border-l-[1px] border-r-[1px]"
                    style={{
                        borderImageSource:
                            "linear-gradient(to bottom, white, #D6D5D5, #908F8F, white)",
                        borderImageSlice: 1,
                    }}
                >
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-left">
                            Register
                        </h2>
                    </div>

                    {/* Registration Form */}
                    <div className="space-y-4">

                        {/* Formik Registration Form */}
                        <Formik
                            initialValues={{ name: "", email: "", contact: "", password: "" }}
                            validationSchema={registerSchema}
                            onSubmit={handleSubmit}
                            validateOnBlur={false}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4">
                                    <CustomTextInput
                                        name="name"
                                        label="Full Name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        required
                                        startIcon={
                                            <img
                                                src={userImage}
                                                alt="User Icon"
                                                className="w-5 h-5 text-gray-400"
                                            />
                                        }
                                        autoComplete="name"
                                    />

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
                                        name="contact"
                                        label="Contact"
                                        type="text"
                                        placeholder="Enter your contact number"
                                        required
                                        startIcon={
                                            <img
                                                src={phoneImage}
                                                alt="Phone Icon"
                                                className="w-5 h-5 text-gray-400"
                                            />
                                        }
                                        autoComplete="tel"
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
                                                    <EyeOff className="w-5 h-5 text-purple-600" />
                                                ) : (
                                                    <Eye className="w-5 h-5 text-purple-600" />
                                                )}
                                            </button>
                                        }
                                        autoComplete="new-password"
                                    />

                                    {/* Terms & Privacy Policy */}
                                    <div className="text-sm text-gray-700">
                                        By Registering, you are agreeing to our{" "}
                                        <a href="#" className="text-purple-600 hover:underline">
                                            Terms of Use
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-purple-600 hover:underline">
                                            Privacy Policy
                                        </a>
                                        .
                                    </div>

                                    {/* Register Button & Login Link */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full sm:w-[40%] flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            {isSubmitting ? "Registering..." : "Register"}
                                        </button>
                                        <p className="text-center text-sm text-gray-900">
                                            Already have an account?{" "}
                                            <div
                                                onClick={() => navigate("/userLogin")}
                                                className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
                                            >
                                                Login
                                            </div>
                                        </p>
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

export default UserRegister;
