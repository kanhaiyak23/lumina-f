// import React, { useState } from "react";
// import useFetch from "../../../hook/useFetch";
// import InfiniteScroll from "react-infinite-scroll-component";

import React, { useRef, useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetch from "../../../hook/useFetch";
import LoadingWebp from "../../../assets/loading.webp";
import { useEffect } from "react";
import Grid from "../../layout/grid/Grid";
const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

const InfiniteScrollWrapper = ({
    height,
    url = "https://dummyjson.com/products?limit=10&skip=10&select=id,title,price,reviews",
    search = "",
    params = {},
    ItemComp = null,
    gap = null,
    isNewDataShow = false,
    onSuccess,
    className = "",
    size = { xs: 12, md: 12, lg: 12 },
    pageLimit = 10,
}) => {
    const _size = {
        xs: 12,
        md: 12,
        lg: 12,
        ...size,
    };

    // console.log({ params });
    // nnnn
    const [items2, setItems2] = useState([]);
    const [componentReflector, setComponentReflector] = useState(1);
    const page = useRef(1);
    const hasMoreData = useRef(true);
    const localParams = useRef({ ...params });
    const scrollRef = useRef(null);

    useEffect(() => {
        if (JSON.stringify(params) !== JSON.stringify(localParams.current)) {
            if (scrollRef?.current?.scrollTop) {
                scrollRef.current.scrollTop = 0;
            }
            hasMoreData.current = true;
            localParams.current = { ...params };
            page.current = 1;
            setComponentReflector(Date.now());
        }
    }, [params]);

    const { data, isLoading, isError, refetch } = useFetch({
        url: url,
        search,
        params: { ...localParams?.current, page: page.current, limit: pageLimit },
        // enabled : !isNewDataShow,
        onSuccess: res => {
            onSuccess?.(res);
            // const data = res.data;
            // data.data = [...data.products];
            // delete data.products;
            // setItems2(
            //   !isNewDataShow
            //     ? [...items2, ...res?.data?.data?.list]
            //     : res?.data?.data?.list
            // );
            let _data = [];
            console.log("red", _data);
            if (res?.data?.data?.metadata?.page == 1) {
                _data = res?.data?.data?.list;
            } else {
                _data = [...items2, ...res?.data?.data?.list];
            }
            if (_data.length === res?.data?.data?.metadata?.totalCount) {
                hasMoreData.current = false;
            }
            setItems2(_data);
            return data;
        },
        onError: err => {
            console.log(err);
            if (err?.response?.data?.error?.message?.includes("range not satisfiable")) {
                hasMoreData.current = false;
            }
        },
        onClear: () => {
            setItems2([]);
        },
    });

    if (isLoading && items2.length === 0)
        return (
            <div className="grid place-content-center min-h-40">
                <img src={LoadingWebp} alt="loading-webp" className="w-8 h-8" />
            </div>
        );
    return (
        <div
            id="scrollableDiv"
            className={`overflow-auto flex flex-col flex-1`}
            style={{
                height: height || "100%",
            }}
            ref={scrollRef}
        >
            {items2.length === 0 && !isLoading && (
                <div className="flex-1 flex justify-center items-center">
                    <p>No data available.</p>
                </div>
            )}
            {items2.length > 0 && (
                <InfiniteScroll
                    className={`${className} flex-1`}
                    style={{
                        gap: gap || "1rem",
                    }}
                    scrollableTarget="scrollableDiv"
                    dataLength={items2.length}
                    next={() => {
                        if (!isLoading) {
                            console.log(999);
                            // if(items2.length !== data?.total)
                            page.current = page.current + 1;
                            setComponentReflector(Date.now());
                        }
                    }}
                    // hasMore={true}
                    hasMore={hasMoreData.current}
                    loader={
                        <div className="grid place-content-center min-h-40">
                            <img src={LoadingWebp} alt="loading-webp" className="w-8 h-8" />
                        </div>
                    }
                >
                    <Grid className={"flex-1"}>
                        {items2.map((data, index) => (
                            <Grid item xs={_size.xs} md={_size.md} lg={_size.lg}>
                                {ItemComp ? (
                                    <ItemComp data={data} index={index} />
                                ) : (
                                    <div style={style} key={index}>
                                        div - #{index}
                                    </div>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default React.memo(InfiniteScrollWrapper);
