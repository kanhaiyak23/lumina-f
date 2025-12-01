import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import CustomButton from "../../../components/common/CustomButton/CustomButton";
import CustomTextInput from "../../../components/common/CustomTextInput";
import Link1 from "../../../components/typography/Link1";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { AuthService } from "../../../Services/loginService.js";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "../../../Redux Store/Slices/auth.js";
import Logo from "../../../assets/logo.svg";

function Login() {
    const ctx = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const navigate = useNavigate();

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .min(8, "Too Short!")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number",
            )
            .max(50, "Too Long!")
            .required("Required"),
    });

    const OnSubmit = async (values, { setSubmitting, resetForm, setFieldValue, setErrors }) => {
        const GetCurrentLocation = () => {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            const lat = position.coords.latitude;
                            const long = position.coords.longitude;
                            resolve({ lat, long });
                        },
                        error => {
                            reject(error);
                        },
                    );
                } else {
                    reject(new Error("Geolocation is not supported by this browser."));
                }
            });
        };

        try {
            const location = await GetCurrentLocation();
            const data = {
                email: values.email,
                password: values.password,
                latitude: location.lat,
                longitude: location.long,
            };
            // const response = await AuthService.login(data);
            // if (response.data.success === true) {
            //     toast.success("Login Successful.");
            //     const tokens = response.data.data;
            //     dispatch(setTokens(tokens));
            //     navigate("/");
            // } else {
            //     const apiError = response.response.data.error;
            //     if (Array.isArray(apiError)) {
            //         apiError.forEach(err => {
            //             if (err.path === "password") {
            //                 setErrors(err.msg);
            //             } else if (err.path === "email") {
            //                 setErrors(err.msg);
            //             }
            //         });
            //     } else {
            //         toast.error(response.response.data.error);
            //     }
            // }
        } catch (error) {
            const apiError = error.response.data.error;
            if (Array.isArray(apiError)) {
                apiError.forEach(err => {
                    if (err.path === "password") {
                        setErrors({
                            password: err.msg,
                        });
                    } else if (err.path === "email") {
                        setErrors(err.msg);
                    }
                });
            } else {
                toast.error(error.response.data.error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3FBF1]">
            {/* Logo */}
            <div className="mb-8">
                <img src={Logo} alt="Microgreens" className="h-12" />
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-sm">
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={OnSubmit}
                >
                    {({
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        values,
                        isValid,
                        isSubmitting,
                    }) => (
                        <Form className="space-y-6">
                            {/* User ID Field */}
                            <div>
                                <label className="block text-gray-700 mb-2">User ID</label>
                                <CustomTextInput
                                    name="email"
                                    placeholder="enter user id"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#45B618]"
                                    errorMessage={errors.email}
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <CustomTextInput
                                    name="password"
                                    type={isPasswordShow ? "text" : "password"}
                                    placeholder="enter password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#45B618]"
                                    errorMessage={errors.password}
                                    endIcon={
                                        isPasswordShow ? (
                                            <EyeSlashIcon
                                                className="w-5 h-5 text-gray-500 cursor-pointer"
                                                onClick={() => setIsPasswordShow(false)}
                                            />
                                        ) : (
                                            <EyeIcon
                                                className="w-5 h-5 text-gray-500 cursor-pointer"
                                                onClick={() => setIsPasswordShow(true)}
                                            />
                                        )
                                    }
                                />
                            </div>

                            {/* Remember Me Checkbox */}
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-[#45B618] focus:ring-[#45B618]"
                                    />
                                    <span className="ml-2 text-gray-700">Remember me</span>
                                </label>
                            </div>

                            {/* Login Button */}
                            <CustomButton
                                style={{
                                    width: "100%",
                                    backgroundColor: "#45B618",
                                    color: "white",
                                    padding: "0.75rem",
                                    borderRadius: "0.5rem",
                                }}
                                label="Login"
                                type="submit"
                                isLoading={isSubmitting}
                                disabled={!isValid || isSubmitting}
                            />

                            {/* Forgot Password Link */}
                            <div className="text-center">
                                <Link1
                                    onClick={() => navigate("/forgot-password")}
                                    className="text-gray-600 hover:text-[#45B618]"
                                >
                                    Forgot password?
                                </Link1>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Login;
