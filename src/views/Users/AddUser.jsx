import React, { useState } from "react";
import PageHeader from "../../components/layout/LayoutWrapper/PageHeader";
import CLabel from "../../components/common/CLabel";
import { BiLock, BiLogoGmail, BiMobile } from "react-icons/bi";
import CustomButton from "../../components/common/CustomButton/CustomButton";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAllRoleUrl, userUrl } from "../../utils/urls";
import CustomTextInput from "../../components/common/CustomTextInput";
import CustomSelect from "../../components/common/CustomSelect";
import { errorToast, successToast } from "../../utils/toasts";
import { useNavigate } from "react-router-dom";
import Grid from "../../components/layout/grid/Grid";
import CustomTextArea from "../../components/common/CustomTextArea";

export const AddUser = () => {
    const initialValues = {
        name: "",
        last_name: "",
        email: "",
        job_role: "",
        mobile_number: "",
        password: "",
    };
    const [text, setText] = useState("");
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        last_name: Yup.string().required("Surname is Required"),
        email: Yup.string().email("Invalid email").required("Email is Required"),
        job_role: Yup.string().required("Job Role Required"),
        mobile_number: Yup.string()
            .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
            .required("Mobile Number is Required"),
        password: Yup.string()
            .min(8, "Too Short!")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            )
            .max(50, "Too Long!")
            .required("Password is Required"),
    });

    const navigate = useNavigate();

    const handleChange = e => {
        setText(e.target.value);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: data => axios.post(userUrl, data),
        onSuccess: res => {
            successToast("New User Added");
            navigate(-1);
        },

        onError: err => {
            console.log(err.response?.data?.error?.message);
            errorToast(err?.response?.data?.error?.message || "Something Went Wrong!");
        },
    });
    const onSubmit = (values, others) => {
        console.log(others);
        const data = {
            first_name: values.name,
            last_name: values.last_name,
            email: values.email,
            phone_number: values.mobile_number,
            role_id: values.job_role,
            password: values.password,
        };
        console.log({ values, data });
        mutate(data);
    };

    const { data } = useQuery({
        queryFn: () => axios.get(getAllRoleUrl),
        queryKey: ["role-list"],
    });
    const roleList =
        data?.data?.data?.list?.map(option => {
            const _option = {
                label: option.title,
                value: option.id,
            };
            return _option;
        }) || [];

    return (
        <div className="flex gap-[50px] flex-col">
            <PageHeader showBack title="Add User" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, isSubmitting }) => (
                    <Form className="space-y-4 md:space-y-6">
                        <div className="flex flex-col gap-10">
                            <Grid className={"items-center"}>
                                <Grid item xs={12} md={6}>
                                    <CLabel label={"Name"} required={true} className={"text-xl"} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextInput
                                        name="name"
                                        className="min-w-[420px]"
                                        placeholder="Enter Name"
                                    />
                                </Grid>
                            </Grid>

                            <Grid className={"items-center"}>
                                <Grid item xs={12} md={6}>
                                    <CLabel
                                        label={"Surname"}
                                        required={true}
                                        className={"text-xl"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextInput
                                        name="last_name"
                                        className="min-w-[420px]"
                                        placeholder="Enter Surname  Here"
                                    />
                                </Grid>
                            </Grid>

                            <Grid className={"items-center"}>
                                <Grid item xs={12} md={6}>
                                    <CLabel
                                        label={"Job Role"}
                                        required={true}
                                        className={"text-xl"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomSelect
                                        required
                                        type="text"
                                        name="job_role"
                                        menuList={roleList}
                                        className="min-w-[420px]"
                                        placeholder="Select User Here"
                                        startIcon={<BiMobile size={20} />}
                                    />
                                </Grid>
                            </Grid>

                            <Grid className={"items-center"}>
                                <Grid item xs={12} md={6}>
                                    <CLabel
                                        label={"Mobile Number"}
                                        required={true}
                                        className={"text-xl"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextInput
                                        name="mobile_number"
                                        className="min-w-[420px]"
                                        placeholder="Enter Mobile Number Here"
                                        startIcon={<BiMobile size={20} />}
                                    />
                                </Grid>
                            </Grid>

                            <Grid className={"items-center"}>
                                <Grid item xs={12} md={6}>
                                    <CLabel
                                        type="email"
                                        label={"Email Address"}
                                        required={true}
                                        className={"text-xl"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextInput
                                        name="email"
                                        className="min-w-[420px]"
                                        placeholder="Enter Email Here"
                                        startIcon={<BiLogoGmail size={20} />}
                                    />
                                </Grid>
                            </Grid>

                            <Grid className={"items-center"}>
                                <Grid item xs={12} md={6}>
                                    <CLabel
                                        label={"Password"}
                                        required={true}
                                        className={"text-xl"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextInput
                                        name="password"
                                        className="min-w-[420px]"
                                        placeholder="Enter Password Here"
                                        startIcon={<BiLock size={20} />}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className={"items-center"}>
                                <Grid item xs={12} md={6}>
                                    <CLabel
                                        label={"Textarea"}
                                        required={true}
                                        className={"text-xl"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextArea
                                        name="textarea"
                                        className="min-w-[420px]"
                                        placeholder="Enter Text Here....."
                                        startIcon={<BiLock size={20} />}
                                    />
                                </Grid>
                            </Grid>
                            <div className="flex justify-end">
                                <CustomButton
                                    label="Save Changes"
                                    isLoading={isPending}
                                    disabled={isPending || !isValid}
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
