import React, { useEffect, useMemo } from "react";
import {
    Pagination,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";
import { useState } from "react";

const customTableTheme = {
    root: {
        shadow: "hidden",
        // base: "bg-red-900", // table
        wrapper: "flex-1 flex flex-col border-none",
    },
    // body: {
    //     "base": "bg-red-500",
    //     "wrapper": "bg-red-700"
    // }
};

/**
 * Renders a custom data grid component.
 *
 * @param {Object} props - The properties for the custom data grid.
 * @param {boolean} props.checkboxSelection - Whether to enable checkbox selection. Default is false.
 * @param {string} props.keyId - The key identifier for each row item.
 * @param {function} props.onPageChange - The callback function for page change event. Default logs the page number.
 * @param {boolean} props.isLoading - Whether the data is currently loading. Default is false.
 * @param {Array} props.columns - The array of column objects.
 * @param {string} props.columns[].field - The field name for the column.
 * @param {string} props.columns[].headerName - The header name for the column.
 * @param {string} props.columns[].width - The width of the column.
 * @param {function} props.columns[].renderCell - The function to render the cell content.
 * @param {Array} props.rows - The array of row objects.
 * @param {number} props.pageNumber - The current page number. Default is null.
 * @param {number} props.perPageSize - The number of items per page. Default is 10.
 * @param {number} props.totalPages - The total number of pages. Default is null.
 * @return {JSX.Element} The custom data grid component.
 */
function CustomDataGrid({
    checkboxSelection = false,
    keyId,
    onPageChange = _pageNumber => console.log(_pageNumber),
    isLoading = false,
    columns = [],
    rows = [],
    pageNumber = null,
    perPageSize = 10,
    totalPages = null,
}) {
    const [localPageNumber, setLocalPageNumber] = useState(1);

    useEffect(() => {
        if (pageNumber !== null) {
            setLocalPageNumber(pageNumber);
        }
    }, [pageNumber]);

    const getRows = useMemo(() => {
        return rows?.slice((localPageNumber - 1) * perPageSize, localPageNumber * perPageSize);
    }, [rows, localPageNumber]);

    const isNoData = useMemo(() => {
        return Boolean(!isLoading && rows?.length === 0);
    }, [rows, isLoading]);

    return (
        <div
            className={`flex-1 flex flex-col min-h-[500px] max-h-[calc(100vh-100px)] overflow-hidden  `}
        >
            <div className={`flex-1 flex flex-col overflow-auto`}>
                <Table hoverable={false} theme={customTableTheme} className="border-none">
                    <TableHead
                        className={`sticky top-0 bg-[#F8FAFC] !font-bold text-black border-gray-600 rounded-lg z-[1]`}
                    >
                        {checkboxSelection && (
                            <TableHeadCell className="p-4">
                                <Checkbox />
                            </TableHeadCell>
                        )}
                        {columns.map((column, index) => (
                            <TableHeadCell
                                style={{ minWidth: column?.width ? column?.width : "auto" }}
                                // className={`${column?.width ? `min-w-[${column?.width}]` : ''} `}
                                className={`p-4 text-[#64748B] normal-case text-base font-medium`}
                                key={`${column?.field}-${index}`}
                            >
                                {column?.headerName}
                            </TableHeadCell>
                        ))}
                    </TableHead>
                    <TableBody className="divide-y">
                        {/* //* Line Loading */}
                        {isLoading && (
                            <TableRow>
                                <TableCell className="p-0" colSpan={columns?.length}>
                                    <div className="w-full">
                                        <div className="h-1.5 w-full bg-cyan-100 overflow-hidden">
                                            <div className="animate-progress w-full h-full bg-cyan-500 origin-left-right"></div>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* {!isLoading && rows?.length === 0 && (
              <TableRow>
                <TableCell className="p-0" colSpan={columns?.length}>
                  <div className="w-full">
                    <h1>No Data</h1>
                  </div>
                </TableCell>
              </TableRow>
            )} */}

                        {getRows?.map((rowItem, rowIndex) => (
                            <TableRow
                                className="bg-white dark:border-gray-700 dark:bg-gray-800 text-[#27272A] font-bold border-b"
                                key={keyId ? rowItem[keyId] : `rowItem-${rowIndex}`}
                            >
                                {/* CheckBox component */}
                                {checkboxSelection && (
                                    <TableCell className="p-4">
                                        <Checkbox />
                                    </TableCell>
                                )}

                                {/* render cells */}
                                {columns.map((columnItem, columnIndex) => {
                                    if (columnItem?.renderCell) {
                                        return (
                                            <TableCell key={`${columnItem?.field}-${columnIndex}`}>
                                                {columnItem?.renderCell(
                                                    rowItem,
                                                    rowItem[columnItem?.field],
                                                )}
                                            </TableCell>
                                        );
                                    } else {
                                        return (
                                            <TableCell key={`${columnItem?.field}-${columnIndex}`}>
                                                {rowItem[columnItem?.field]}
                                            </TableCell>
                                        );
                                    }
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {isNoData && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <h1>No Data</h1>
                    </div>
                )}
            </div>
            <div className="sticky bottom-0 bg-white shadow-md p-3 border-t border-solid border-[#e0e0e0] flex items-center justify-center">
                <Pagination
                    className={` border-solid border-[#e0e0e0] p-3 flex items-center justify-end`}
                    layout="navigation"
                    currentPage={localPageNumber}
                    totalPages={
                        totalPages !== null ? totalPages : Math.ceil(rows?.length / perPageSize)
                    }
                    // onPageChange={onPageChange}
                    onPageChange={_page => {
                        if (pageNumber !== null) {
                            onPageChange(_page);
                        } else {
                            setLocalPageNumber(_page);
                        }
                    }}
                    showIcons
                    theme={customPaginationTheme}
                />
            </div>
        </div>
    );
}

export default CustomDataGrid;

const customPaginationTheme = {
    // base: "bg-blue-500",
    pages: {
        base: "xs:mt-0 inline-flex items-center -space-x-px",
    },
};
