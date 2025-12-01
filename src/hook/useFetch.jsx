import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const useFetch = ({
    url,
    enabled = true,
    params = {},
    search = "",
    onSuccess = res => res.data,
    onError = () => {},
}) => {
    const memoParams = useMemo(() => params, [JSON.stringify(params)]);
    console.log({ params });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); // Initially set to false
    const [error, setError] = useState(null);

    // Function to fetch data
    const fetchData = async () => {
        if (!enabled || !url) return; // Skip fetching if not enabled

        try {
            setLoading(true);
            const response = await axios.get(url, {
                params,
            });
            const reponseData = onSuccess(response) || response;
            setData(reponseData);
            setError(null);
        } catch (err) {
            setError(err);
            setData(null);
            onError(err);
        } finally {
            setLoading(false);
        }
    };
    // }, [url, axiosOptions, enabled, params]);

    // Fetch data on mount or when URL/options/enabled change
    useEffect(() => {
        fetchData();
    }, [url, enabled, search, memoParams]);

    // Return data, loading, error, refetch, and their boolean equivalents
    return {
        data,
        loading,
        error,
        refetch: fetchData,
        isLoading: loading,
        isError: !!error,
    };
};

export default useFetch;
