// import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { ToastContainer } from "react-toastify";
// import { successToast, errorToast } from "../../../../src/utils/toasts";
// import "react-toastify/dist/ReactToastify.css";
// import forgotPasswordImage from "../../../assets/login/forgotPass.svg";

// const otpSchema = Yup.object().shape({
//     otp: Yup.string()
//         .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
//         .required("OTP is required"),
// });

// const ForgotPasswordOTP = ({ setStep }) => {
//     const [otp, setOtp] = useState(["", "", "", "", "", ""]);

//     const handleChange = (e, index) => {
//         const { value } = e.target;
//         if (/^\d*$/.test(value) && value.length <= 1) {
//             let newOtp = [...otp];
//             newOtp[index] = value;
//             setOtp(newOtp);

//             // Move to the next input field
//             if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
//         }
//     };

//     const handleSubmit = async (_, { setSubmitting }) => {
//         try {
//             await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
//             successToast("OTP verified successfully!");
//             setStep(3); // Move to next step
//         } catch (error) {
//             errorToast("Invalid OTP. Please try again.");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center sm:p-4">
//             <div className="main-content-container flex flex-col sm:flex-row w-full items-center justify-between">
//                 <div className="w-full sm:w-[40%] hidden sm:block">
//                     <img src={forgotPasswordImage} alt="Verify OTP" className="w-full h-auto" />
//                 </div>

//                 <div
//                     className="w-full sm:w-[55%] space-y-6 bg-white p-6 sm:p-10 rounded-xl border-l-[1px] border-r-[1px] "
//                     style={{
//                         borderImageSource:
//                             "linear-gradient(to bottom, white, #D6D5D5, #908F8F, white)",
//                         borderImageSlice: 1,
//                     }}
//                 >
//                     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                         Forgot Your Password?
//                     </h2>
//                     <p className="text-black font-bold text-sm">
//                         Please enter your verification code.
//                     </p>
//                     <p className="font-normal">
//                         We have sent a verification code to your registered email ID.
//                     </p>

//                     <Formik
//                         initialValues={{ otp: "" }}
//                         validationSchema={otpSchema}
//                         onSubmit={handleSubmit}
//                     >
//                         {({ isSubmitting }) => (
//                             <Form className="space-y-4">
//                                 {/* OTP Boxes */}
//                                 <div className="flex justify-start space-x-2">
//                                     {otp.map((digit, index) => (
//                                         <Field
//                                             key={index}
//                                             id={`otp-${index}`}
//                                             name="otp"
//                                             type="text"
//                                             maxLength="1"
//                                             value={digit}
//                                             onChange={e => handleChange(e, index)}
//                                             className=" w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//                                         />
//                                     ))}
//                                 </div>

//                                 {/* Done Button */}
//                                 <button
//                                     type="submit"
//                                     disabled={isSubmitting}
//                                     className={`w-full sm:w-[30%] py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#04A42A] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
//                                         isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//                                     }`}
//                                 >
//                                     {isSubmitting ? "Verifying..." : "Done"}
//                                 </button>
//                             </Form>
//                         )}
//                     </Formik>
//                 </div>

//                 <ToastContainer position="top-right" autoClose={3000} />
//             </div>
//         </div>
//     );
// };

// export default ForgotPasswordOTP;
