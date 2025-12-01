import React, { useEffect, useState } from "react";
import CustomChip from "../components/common/CustomChip";
import {
    HomeIcon,
    InformationCircleIcon,
    MinusCircleIcon,
    PencilIcon,
    UserPlusIcon,
} from "@heroicons/react/16/solid";
import CustomTab from "../components/common/CustomTab";
import CustomModal from "../components/common/CustomDialog/CustomModal";
import CustomTextInputBasic from "../components/common/CustomTextInput/CustomTextInputBasic";
import CustomSelectBasic from "../components/common/CustomSelect/CustomSelectBasic";
import Headline1 from "../components/typography/Headline1";
import Lead1 from "../components/typography/Lead1";
import CustomButton from "../components/common/CustomButton/CustomButton";
import LoginForm from "./ComponentsForm";
import CustomSearch from "../components/common/CustomSearch";
import CustomSwitch from "../components/common/CustomSwitch";
import CustomRange from "../components/common/CustomRange";
import CustomMenu from "../components/common/CustomMenu";
import CustomPaperBox from "../components/common/CustomPaperBox";
import PageHeader from "../components/layout/LayoutWrapper/PageHeader";
import Stepper from "../components/common/Stepper";
import Text from "../components/typography/Text";
import CustomIconButton from "../components/common/CustomButton copy/CustomIconButton";
import RespIcon from "../components/common/RespIcon";
import { BiHomeSmile } from "react-icons/bi";
import CustomProgressbar from "../components/common/CustomProgressbar";
import InfiniteScrollWrapper from "../components/common/InfiniteScrollWrapper";
import AvatarGroup from "../components/common/StackedAvatar.jsx";
import DragAndDrop from "../components/common/DragAndDrop/index.jsx";
import ModeSwitcher from "../components/common/ModeSwitcher/index.jsx";
import CustomDropdownMenu from "../components/CustomDropdownMenu.jsx";
import { TbShredder } from "react-icons/tb";
import { MdPages } from "react-icons/md";
import { Formik } from "formik";
import * as Yup from "yup";
import FileInputBasic from "../components/common/FileInput/FileInputBasic.jsx";
import FileInput from "../components/common/FileInput/index.jsx";
import { hideLoader, showLoader } from "../utils/loader.js";
import Loadingbar from "../components/common/CustomProgressbar/Loadingbar.jsx";

export function Components() {
    const [value, setValue] = useState(0);
    function onChange() {
        setValue(!value);
    }
    const [timerToggle, setTimerToggle] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            timerToggle && hideLoader();
            setTimerToggle(false);
        }, 2000);
    }, [timerToggle]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-[90vh] overflow-auto">
            <div className=" px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className=" bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <CustomPaperBox className="flex flex-col items-start gap-4  ">
                            <CustomSearch className="w-full" />
                            <PageHeader
                                showBack
                                title="Loader Utils"
                                size="md"
                                noShowBackNavigate
                                showBackOnClick={() => alert(999)}
                            />
                            <CustomButton
                                variant="green"
                                label="Show Loader"
                                onClick={() => {
                                    showLoader();
                                    setTimerToggle(true);
                                }}
                            />
                            <CustomButton
                                label="Show Loader with Message "
                                onClick={() => {
                                    showLoader("User Data Fetching...");
                                    setTimerToggle(true);
                                }}
                            />
                        </CustomPaperBox>
                        <CustomPaperBox className="flex flex-col items-start gap-4">
                            <PageHeader showBack title="File Input with variants" size="md" />
                            <FileInputBasic />
                            <FileInputBasic label="Choose Image" size={70} sizeVariant="KB" />
                            <div className="flex gap-4 items-center">
                                <FileInputBasic variant="button" />
                                <FileInputBasic
                                    variant="button"
                                    buttonVariant="contained"
                                    label="Upload Image"
                                />
                            </div>
                            <PageHeader title="with Formik" />
                            <Formik
                                initialValues={{
                                    file: null,
                                }}
                            >
                                <FileInput name="file" />
                            </Formik>
                        </CustomPaperBox>
                        <CustomPaperBox className="flex flex-col gap-4">
                            <PageHeader showBack title="Switch" size="md" />
                            <CustomSwitch />
                            <CustomPaperBox>
                                <FileInputBasic />
                            </CustomPaperBox>
                            <CustomMenu
                                label={<CustomIconButton icon={<HomeIcon />} />}
                                // label={<CustomDropDownMenuLabel label="Current CTC" />}
                            >
                                {({ handleToggle }) => (
                                    <div className="min-w-72 flex flex-col gap-4 p-5 shadow-xl ">
                                        <p>Select Range</p>
                                        <CustomRange value={value} setValue={setValue} />

                                        <CustomButton
                                            variant="text"
                                            label="Apply"
                                            onClick={handleToggle}
                                        />
                                    </div>
                                )}
                            </CustomMenu>
                            <CustomDropdownMenu
                                // position="left"
                                // label="Click Me"
                                icon={<MdPages />}
                                list={[
                                    {
                                        label: "Red",
                                    },
                                    {
                                        label: "Yello",
                                    },
                                ]}
                            />
                        </CustomPaperBox>
                        <AvatarGroup />
                        <ModeSwitcher onChange={onChange} value={value} />
                        <CustomPaperBox className="flex flex-col gap-4 overflow-auto ">
                            <DragAndDrop />
                        </CustomPaperBox>
                        <CustomPaperBox className="flex flex-col gap-4 h-64 overflow-auto ">
                            <PageHeader title="Infinite Scroll" size="md" />
                            <InfiniteScrollWrapper
                                height={"450px"}
                                ItemComp={({ index }) => (
                                    <CustomPaperBox>
                                        <Text>Hello world: {index}</Text>
                                    </CustomPaperBox>
                                )}
                            />
                        </CustomPaperBox>
                        <CustomPaperBox className="flex flex-col gap-4">
                            <PageHeader title="Progress bar" size="md" />
                            <CustomProgressbar sent={60} total={100} variant={"blue-bold"} />
                            <CustomProgressbar sent={60} total={100} steps={10} />
                            <CustomProgressbar sent={100} total={100} error />
                            <Loadingbar isLoading={true} />
                        </CustomPaperBox>
                        <CustomPaperBox className="flex flex-col gap-4">
                            <PageHeader title="Chips" size="md" />
                            <Text>Variants with Sizes</Text>
                            <RespIcon icon={<HomeIcon />} size={"sm"} />
                            <RespIcon icon={<HomeIcon />} size={"md"} />
                            <div className="flex gap-4">
                                <CustomIconButton
                                    icon={<PencilIcon />}
                                    size="sm"
                                    variant="default-outlined"
                                />
                            </div>
                            <div className="flex gap-4 flex-wrap items-center">
                                <CustomChip label="Success" variant="success" />
                                <CustomChip label="Warning" variant="warning" />
                                <CustomChip label="Error" variant="error" />
                                <CustomChip label="Default" variant="default" />
                                <CustomChip label="Purple" variant="purple" />
                                <CustomChip label="Primary" variant="primary" />
                                <CustomChip label="Blue" variant="blue" />
                                <CustomChip label="BlueBold" variant="blue-bold" />
                            </div>
                            <Text>Sizes</Text>
                            <div className="flex gap-4 items-center">
                                <CustomChip label="Default (Medium)" variant="primary" />
                                <CustomChip label="Medium" size="md" variant="primary" />
                                <CustomChip label="Small" size="sm" variant="primary" />
                                <CustomChip label="Large" size="lg" variant="primary" />
                            </div>
                            <Text>Rounded</Text>
                            <div className="flex gap-4 items-center">
                                <CustomChip label="Default (Medium)" variant="primary" />
                                <CustomChip label="Medium" size="md" variant="primary" />
                                <CustomChip label="Small" size="sm" variant="primary" />
                                <CustomChip label="Large" variant="primary" />
                            </div>
                        </CustomPaperBox>

                        <Headline1 className1="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Log in
                        </Headline1>
                        <Lead1>Hey there! Welcome back </Lead1>
                        <CustomPaperBox>
                            <div>Hello</div>
                        </CustomPaperBox>
                        <CustomMenu label="Sort by">Hi</CustomMenu>
                        <CustomRange value={value} setValue={setValue} />
                        <PageHeader
                            size="md"
                            title={"Page header"}
                            subtitle={"Subtitle"}
                            rightComp={<CustomButton label="Add Role" />}
                        />
                        <Stepper
                            disableInnerStateHandling
                            tabIndex={0}
                            tabList={[
                                {
                                    title: "Login",
                                    component: <LoginForm />,
                                },
                                {
                                    title: "Register",
                                    component: <div>Register Screen will be here</div>,
                                },
                                {
                                    title: "Registe33r",
                                    component: <div>Register Screen will be here</div>,
                                },
                            ]}
                        />
                        <CustomSwitch defaultValue={true} />
                        <CustomSearch label="Search" />
                        <div className="flex gap-2 mt-2">
                            <CustomChip icon={<UserPlusIcon />} label={"Activated"} />
                            <CustomChip
                                icon={<InformationCircleIcon />}
                                label={"Warning"}
                                theme="warn"
                            />
                            <CustomChip
                                icon={<MinusCircleIcon />}
                                label={"Not Allowed"}
                                theme="error"
                            />
                            <CustomModal
                                title={"Send Feedback"}
                                buttonComp={props => (
                                    <CustomButton
                                        label="Open Modal"
                                        width={"20px"}
                                        onClick={props.onClick}
                                    />
                                )}
                                onSubmit={closeDialog => {
                                    closeDialog();
                                }}
                                onCancel={closeDialog => {
                                    closeDialog();
                                }}
                            >
                                <div className="flex flex-col gap-2">
                                    <CustomTextInputBasic
                                        label="Feedback"
                                        startIcon={<PencilIcon />}
                                        endIcon={
                                            <div className="flex gap-1 items-center">
                                                <CustomButton variant="outlined" size="sm">
                                                    Copy
                                                </CustomButton>
                                                <CustomButton size="sm">Verify</CustomButton>
                                            </div>
                                        }
                                    />
                                    <CustomSelectBasic
                                        label="Your City"
                                        menuList={[
                                            {
                                                value: "PN",
                                                label: "Pune",
                                            },
                                            {
                                                value: "MI",
                                                label: "Mumbai",
                                            },
                                        ]}
                                    />
                                </div>
                            </CustomModal>
                        </div>
                        <CustomTab
                            tabIndex={0}
                            tabList={[
                                {
                                    title: "Login",
                                    component: <LoginForm />,
                                },
                                {
                                    title: "Register",
                                    component: <div>Register Screen will be here</div>,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
