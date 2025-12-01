import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import CustomDataGrid from "./CustomDataGrid";
import axios from "axios";

/**
 * ServerPaginationDataGrid component for handling server-side pagination.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {'GET' | 'POST'} requestMethod - The HTTP request method.
 * @param {object} axiosInterceptors - Axios interceptors for customization.
 * @param {object} requestParameter - Additional parameters for the request.
 * @param {number} limit - The number of items per page.
 * @param {array} columns - The columns to display in the data grid.
 * @param {boolean} isServerPagination - Flag to enable server-side pagination.
 * @param {string} keyId - The unique identifier key for rows.
 * @param {function} dataMapper - Function to map server response data, should return an object with 'list' as Array and 'total' as number. eg. return { list: [], total: number }
 * @return {JSX.Element} CustomDataGrid component with pagination and data display.
 */
const ExamForm = forwardRef;
const ServerPaginationDataGrid = forwardRef(
    (
        {
            url = "https://dummyjson.com/products",
            requestMethod = "GET",
            axiosInterceptors = null,
            requestParameter = {},
            limit = 10,
            columns = [],
            isServerPagination = false,
            keyId,
            dataMapper = null,
            isReadyForGetData = true,
        },
        ref,
    ) => {
        const signal = useRef(null);
        const [isLoading, setIsLoading] = useState(false);

        const [pageNumber, setPageNumber] = useState(0);
        const [maintainPageNumber, setMaintainPageNumber] = useState(0);
        const [totalPages, setTotalPages] = useState(0);

        const [rows, setRows] = useState([]);

        useEffect(() => {
            if (!signal.current) {
                signal.current = new AbortController();
            }

            if (isReadyForGetData) {
                getDataFromServer();
            }

            return () => {
                if (signal.current) {
                    signal.current.abort();
                }
            };
        }, [isReadyForGetData]);

        function getAxiosInstance() {
            if (axiosInterceptors) {
                return axiosInterceptors;
            } else {
                return axios;
            }
        }

        async function getDataFromServer(_pageNumber = 1) {
            if (_pageNumber === 1) {
                setIsLoading(false);
                setPageNumber(0);
                setMaintainPageNumber(0);
                setTotalPages(0);
                setRows([]);
            }
            try {
                setIsLoading(true);
                let axiosLocalInstance = null;

                let _requestParameter = {};
                if (isServerPagination) {
                    _requestParameter = {
                        limit,
                        page: _pageNumber,
                        // skip: (_pageNumber - 1) * 10,
                        ...requestParameter,
                    };
                } else {
                    _requestParameter = requestParameter;
                }

                if (requestMethod === "GET") {
                    axiosLocalInstance = getAxiosInstance().get(url, {
                        params: _requestParameter,
                    });
                } else if (requestMethod === "POST") {
                    axiosLocalInstance = getAxiosInstance().post(url, _requestParameter);
                } else {
                    alert("Pass Valid Request Method");
                    return;
                }

                const serverResponse = await axiosLocalInstance;
                if (serverResponse.data) {
                    let serverResponseData = dataMapper
                        ? dataMapper(serverResponse?.data)
                        : serverResponse?.data;
                    // console.log('serverResponseData => ', serverResponseData);

                    if (_pageNumber > 1) {
                        setRows([...rows, ...serverResponseData?.list]);
                    } else {
                        setRows(serverResponseData?.list);
                    }
                    setPageNumber(_pageNumber);
                    setMaintainPageNumber(_pageNumber);
                    setTotalPages(Math.ceil(serverResponseData?.total / limit));
                    setIsLoading(false);
                } else {
                    throw serverResponse;
                }
            } catch (error) {
                let err =
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    error?.response?.data ||
                    "Something went wrong";
                console.error(error);
                // alert(err);
                setIsLoading(false);
            }
        }

        function restartComponent() {
            setIsLoading(false);
            setPageNumber(0);
            setMaintainPageNumber(0);
            setTotalPages(0);
            setRows([]);

            setTimeout(() => {
                getDataFromServer();
            }, 100);
        }

        useImperativeHandle(ref, () => ({
            restartComponent,
        }));

        return (
            <CustomDataGrid
                keyId={keyId}
                onPageChange={_pageNumber => {
                    if (isServerPagination) {
                        if (_pageNumber > maintainPageNumber) {
                            getDataFromServer(_pageNumber);
                        } else {
                            setPageNumber(_pageNumber);
                        }
                    }
                }}
                isLoading={isLoading}
                columns={columns}
                rows={rows}
                pageNumber={isServerPagination ? pageNumber : null}
                perPageSize={limit}
                totalPages={totalPages}
            />
        );
    },
);

export default ServerPaginationDataGrid;
