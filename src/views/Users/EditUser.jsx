import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/LayoutWrapper/PageHeader";
import CLabel from "../../components/common/CLabel";
import { BiLock, BiLogoGmail, BiMobile } from "react-icons/bi";
import CustomButton from "../../components/common/CustomButton/CustomButton";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { editUserUrl, getAllRoleUrl, getSingleUserUrl } from "../../utils/urls";
import CustomTextInput from "../../components/common/CustomTextInput";
import CustomSelect from "../../components/common/CustomSelect";
import { errorToast, successToast } from "../../utils/toasts";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "../../components/layout/grid/Grid";
import { toast } from "react-toastify";

export const EditUser = () => {
    const [initialValues, setInitialValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role_id: "",
        phone_number: "",
        password: "",
    });
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("Name is Required"),
        last_name: Yup.string().required("Surname is Required"),
        email: Yup.string().email("Invalid email").required("Email is Required"),
        role_id: Yup.string().required("Job Role Required"),
        phone_number: Yup.string()
            .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
            .required("Mobile Number is Required"),
    });

    const navigate = useNavigate();
    const params = useParams();

    const { mutate, isPending } = useMutation({
        mutationFn: data => axios.put(editUserUrl + params.id, data),
        onSuccess: res => {
            successToast("User Updated");
            navigate(-1);
        },

        onError: err => {
            errorToast(err?.response?.data?.error?.message || "Something Went Wrong!");
        },
    });
    const onSubmit = (values, others) => {
        delete values.role;
        mutate(values);
    };

    const { data } = useQuery({
        queryFn: () => axios.get(getAllRoleUrl),
        queryKey: ["role-list"],
    });
    const {
        data: _userData,
        isPending: isPendingGetUserData,
        isError,
    } = useQuery({
        queryFn: () => axios.get(getSingleUserUrl + params.id),
        queryKey: ["user-" + params.id],
    });
    if (!isError) {
        errorToast("User Data not fetched, try again");
    }

    useEffect(() => {
        const userData = _userData?.data?.data;

        if (userData) {
            setInitialValues({ ...userData, role_id: userData.role.id });
        }
    }, [isPendingGetUserData, _userData]);

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
            <PageHeader showBack title="Edit User" />
            <Formik
                enableReinitialize={true}
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
                                        name="first_name"
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
                                        name="role_id"
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
                                        name="phone_number"
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
