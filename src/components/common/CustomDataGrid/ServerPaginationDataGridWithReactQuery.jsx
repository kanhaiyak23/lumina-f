import React, { useState, useImperativeHandle, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import CustomDataGrid from "./CustomDataGrid";
import axios from "axios";
import useDebounce from "../../../hook/useDebounce";
import useFetch from "../../../hook/useFetch";

/**
 * ServerPaginationDataGrid component for handling server-side pagination with React Query.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {string} search - text to fetch data from search parameter.
 * @param {object} requestParameter - Additional parameters for the request.
 * @param {number} limit - The number of items per page.
 * @param {array} columns - The columns to display in the data grid.
 * @param {boolean} isServerPagination - Flag to enable server-side pagination.
 * @param {string} keyId - The unique identifier key for rows.
 * @param {function} dataMapper - Function to map server response data, should return an object with 'list' as Array and 'total' as number. eg. return { list: [], total: number }
 * @return {JSX.Element} CustomDataGrid component with pagination and data display.
 */
const ServerPaginationDataGridWithQuery = forwardRef(
    (
        {
            url = "https://dummyjson.com/products",
            requestParameter = {},
            limit = 10,
            columns = [],
            isServerPagination = false,
            keyId,
            dataMapper = rows => rows,
            search = "",
        },
        ref,
    ) => {
        const [searchValue, setSearchValue] = useState("");
        const [pageNumber, setPageNumber] = useState(1);

        useDebounce(
            () => {
                setSearchValue(search);
            },
            [search],
            { delay: 500, skipFirstCall: true },
        );

        // const { data, isLoading, isError, refetch } = useQuery({
        //   queryKey: ["data", pageNumber, limit, requestParameter, searchValue],
        //   queryFn: () => fetchData(pageNumber),
        //   enabled: isReadyForGetData,
        //   keepPreviousData: true,
        // });
        // todo: added comment

        const params = requestParameter;
        params.limit = limit;
        params.search = search;
        params.page = pageNumber;

        const { data, isLoading, isError, refetch } = useFetch({
            // queryKey: ["data", pageNumber, limit, requestParameter, searchValue],
            url: url,
            search,
            params: params,
        });
        console.log({ data: data?.data?.list });
        useImperativeHandle(ref, () => ({
            restartComponent: () => {
                setPageNumber(1);
                refetch();
            },
        }));

        console.log({ search });

        const list = data?.data?.list || [];
        const metadata = data?.data?.metadata;

        return (
            <CustomDataGrid
                keyId={keyId}
                onPageChange={_pageNumber => {
                    if (isServerPagination) {
                        setPageNumber(_pageNumber);
                    }
                }}
                isLoading={isLoading}
                columns={columns}
                rows={dataMapper(list)}
                pageNumber={isServerPagination ? pageNumber : null}
                perPageSize={limit}
                totalPages={Math.ceil(metadata?.totalCount / limit) || 0}
                isError={isError}
            />
        );
    },
);

export default React.memo(ServerPaginationDataGridWithQuery);
