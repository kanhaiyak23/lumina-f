import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import { UserIcon } from "@heroicons/react/16/solid";
import CustomChip from "../../components/common/CustomChip";
import { useNavigate } from "react-router-dom";
import CustomDropdownMenu from "../../components/CustomDropdownMenu";
import { changeStatusOfUserUrl, userUrl } from "../../utils/urls";
import axios from "axios";
import formatString from "../../utils/formatString";
import ServerPaginationDataGridWithQuery from "../../components/common/CustomDataGrid/ServerPaginationDataGridWithReactQuery";
import CustomSearch from "../../components/common/CustomSearch";

export const Users = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const changeStatusOfUser = (value, id) => {
        axios.put(changeStatusOfUserUrl + id, { is_active: !value });
    };

    const onChange = e => {
        console.log(e);
        setSearch(e);
    };

    const [columns] = useState([
        {
            field: "name",
            headerName: "Name",
            renderCell: params => (
                <div className="flex gap-3">
                    <img src="" alt="" className="h-[40px] rounded-full border aspect-square" />
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">
                            {params.first_name} {params.last_name}
                        </p>
                        <p className="text-sm text-[#475569]">{params.email}</p>
                    </div>
                </div>
            ),
            width: "400px",
        },
        {
            field: "job_role",
            headerName: "Job Role",
            renderCell: params => (
                <div className="flex gap-2 items-center">
                    <div className="  text-black rounded-full flex justify-center items-center">
                        <div className=" flex justify-center items-center bg-primary-light  w-10 h-10 text-primary-dark rounded-full">
                            <UserIcon className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-sm font-medium text-black">{params?.role?.title}</p>
                </div>
            ),
            width: "180px",
        },
        {
            field: "job_role",
            headerName: "Access",
            renderCell: params => (
                <div className="flex gap-3">
                    {params.role?.access?.length
                        ? params.role?.access?.map(a => (
                              <CustomChip label={formatString(a)} theme="violet" />
                          ))
                        : "-----"}
                    {/* <CustomChip label="View Reports" theme="blue" />
          <CustomChip label="Site Manage" />
          <CustomChip label="User Manage" theme="warn" />
          <CustomChip label="Run Job" theme="default" /> */}
                </div>
            ),
        },
        {
            field: "is_active",
            headerName: "Status",
            renderCell: params => (
                <div className="">
                    <AccessSwitch
                        defaultValue={params.is_active}
                        value={params.is_active}
                        onClick={() => changeStatusOfUser(params.is_active, params.id)}
                    />
                </div>
            ),
            width: "180px",
        },
        {
            field: "actions",
            headerName: "   ",
            renderCell: row => (
                <CustomDropdownMenu
                    list={[
                        {
                            label: "Edit",
                            icon: <BiEdit size={16} />,
                            onClick: () => navigate("edit/" + row.id),
                        },
                        // {
                        //   label: "Delete",
                        //   icon: <BiTrash size={16} />,
                        // },
                    ]}
                />
            ),
            width: "180px",
        },
    ]);

    return (
        <>
            <div className="flex justify-between items-center gap-8 mb-5">
                <CustomSearch value={search} onChange={onChange} />
                <CustomButton
                    // variant="contained"
                    // variant="outlined"
                    // variant="default"
                    // variant="text"
                    // variant="warning"
                    // variant="primary"
                    // variant="error"
                    variant="pending"
                    size="md"
                    // disabled
                    label="Add User"
                    onClick={() => navigate("add")}
                />
            </div>
            <ServerPaginationDataGridWithQuery
                requestParameter={{ a: search }}
                search={search}
                columns={columns}
                url={"https://jsonplaceholder.typicode.com/todos"}
                isServerPagination={true}
                dataMapper={data => {
                    return {
                        list: data?.data?.list || [],
                        total: data?.data?.metadata?.totalCount || 1,
                    };
                }}
            />
        </>
    );
};

const AccessSwitch = ({ defaultValue, onClick = () => {} }) => {
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(defaultValue);
    }, [defaultValue]);

    const handleToggle = () => {
        setState(prevState => !prevState);
    };

    return (
        <div onClick={onClick}>
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={state}
                    onChange={handleToggle}
                />
                <div
                    className={`relative w-12 h-7 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:end-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${
                        state
                            ? "peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"
                            : ""
                    }`}
                ></div>
            </label>
        </div>
    );
};

export default AccessSwitch;

// Map data with id and url if succed upload other send key isFailed: true
// Now change all imageControles which will be managed by id
