import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import CustomButton from "../components/common/CustomButton/CustomButton";
import CustomCheckbox from "../components/common/CustomCheckbox";
import CustomRadioButton from "../components/common/CustomRadioButton/CustomRadioButton";
import Grid from "../components/layout/grid/Grid";
import { InboxArrowDownIcon } from "@heroicons/react/20/solid";
import { CustomAccordion } from "../components/common/CustomAccordion.jsx/CustomAccordion";
import CustomAutoComplete from "../components/common/CustomAutoComplete/CustomAutoComplete";
import CustomDatePicker from "../components/common/CustomDatePicker/CustomDatePicker";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../components/common/CustomTextInput";
import CustomSelect from "../components/common/CustomSelect";
import CustomModal from "../components/common/CustomDialog/CustomModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { errorToast, successToast } from "../utils/toasts";

function ComponentsForm() {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const navigate = useNavigate();
    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .min(8, "Too Short!")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number",
            )
            .max(50, "Too Long!")
            .required("Required"),
        isAgreed: Yup.boolean(),
        occupation: Yup.string(),
        // city: Yup.string().required("Required"),
        city_auto: Yup.string().required("Required"),
        dob: Yup.string().required("Date Required"),
    });

    // For POST/PUT/DELETE
    const loginUser = data => {
        console.log({ data });
        return axios.post("https://jsonplaceholder.typicode.com/todos", data);
    };
    const { mutate, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: res => {
            successToast("Login Sucessfull");
            navigate("/sign-up");
        },

        onError: res => {
            successToast("Something Went Wrong!");
        },
    });

    const getList = data => {
        return axios.get("https://jsonplaceholder.typicode.com/todos", data);
    };
    const {
        isPending: isPendingTodoList,
        error,
        data,
        refetch,
    } = useQuery({
        queryKey: ["todo-list"],
        queryFn: getList,
        onSuccess: res => {
            successToast("Todo List Fetched");
        },
        onError: res => {
            errorToast(res.error);
        },
    });
    console.log({ data, isPendingTodoList, refetch });

    const onSubmit = (values, { setSubmitting, resetForm, setFieldValue, setFieldError }) => {
        // same shape as initial values
        // setFieldError('email', 'test')
        mutate(values);
    };

    return (
        <div className="flex flex-col gap-8">
            <CustomButton onClick={() => refetch()} label="Refetch" />
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    isAgreed: true,
                    occupation: "STD",
                    city: [],
                    city_auto: "",
                    dob: "",
                }}
                validationSchema={loginSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, values, isValid, isSubmitting, ...others }) => (
                    <Form className="space-y-4 md:space-y-6">
                        <Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextInput
                                    name={"email"}
                                    label={"Email"}
                                    placeholder={"Email Here"}
                                    startIcon={<InboxArrowDownIcon />}
                                    onChange={e => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextInput
                                    name={"password"}
                                    label={"Password"}
                                    type={isPasswordShow ? "text" : "password"}
                                    placeholder={"Password"}
                                    endIcon={
                                        isPasswordShow ? (
                                            <EyeSlashIcon
                                                onClick={() => {
                                                    setIsPasswordShow(false);
                                                }}
                                            />
                                        ) : (
                                            <EyeIcon
                                                onClick={() => {
                                                    setIsPasswordShow(true);
                                                }}
                                            />
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomSelect
                                    required
                                    multiple
                                    label="Select City"
                                    placeholder={"Select City"}
                                    name="city"
                                    menuList={[
                                        { label: "Pune", value: "Pune" },
                                        { label: "Mumbai", value: "Mumbai" },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomDatePicker
                                    name="dob"
                                    label={"Select DOB"}
                                    placeholder="Select DOB"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomAutoComplete
                                    required
                                    label={
                                        "Select City (Auto Complete Formik): " + values.city_auto
                                    }
                                    placeholder={"Select City (Auto Complete Formik)"}
                                    name="city_auto"
                                    value={values.city_auto}
                                    onChange={handleChange}
                                    menuList={[
                                        { label: "Pune", value: "Pune" },
                                        { label: "Mumbai", value: "Mumbai" },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomRadioButton
                                    name="occupation"
                                    value={values.occupation}
                                    onChange={handleChange}
                                    radioList={[
                                        {
                                            label: "Student 👨‍🎓",
                                            value: "STD",
                                        },

                                        {
                                            label: "Teacher 👨‍🏫",
                                            value: "TCHR",
                                        },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomCheckbox
                                    checked={values.isAgreed}
                                    onChange={handleChange}
                                    name="isAgreed"
                                    label={
                                        <>
                                            Agree with{" "}
                                            <CustomModal
                                                title={"Terms & Conditions"}
                                                buttonComp={props => (
                                                    <a
                                                        onClick={() => props.onClick()}
                                                        className="text-blue-500 cursor-pointer"
                                                    >
                                                        Terms & Conditions
                                                    </a>
                                                )}
                                            >
                                                <p>Hi Hello, Hi hello</p>
                                                <p>Hi Hello, Hi hello</p>
                                                <p>Hi Hello, Hi hello</p>
                                            </CustomModal>
                                        </>
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomButton
                                    style={{
                                        width: "100%",
                                    }}
                                    label={"Login"}
                                    size={"md"}
                                    type={"submit"}
                                    onClick={() => {
                                        console.log("clicked");
                                    }}
                                    disabled={isPending}
                                    isLoading={isPending}
                                />
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <div className="flex-flex-col gap-4 border-t-2 p-2 ">
                <div className="text-lg text-center my-4">FAQ</div>
                <CustomAccordion title={"How will I get alert abot job vaccancies?"}>
                    <p className="text-sm">Lorem Epsum</p>
                </CustomAccordion>
            </div>
        </div>
    );
}

export default ComponentsForm;
const options = [
    { value: "pune", label: "Pune" },
    { value: "nagpur", label: "Nagpur" },
    { value: "umred", label: "Umred" },
];
