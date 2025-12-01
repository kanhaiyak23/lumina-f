import { useState } from "react";

const useMutation = (mutationFn, { onSuccess = res => res.data, onError = () => {} }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const mutate = async variables => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        setError(null);

        try {
            const result = await mutationFn(variables);
            onSuccess(result);
            setData(result);
            setIsSuccess(true);
        } catch (err) {
            onError(err);
            setIsError(true);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { mutate, isLoading, isError, isSuccess, error, data };
};

export default useMutation;
