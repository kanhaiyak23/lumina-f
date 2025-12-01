import { toast } from "react-toastify";

export const successToast = (message = "Successfull!") => {
    dismissToast();

    return toast.success(message);
};
export const warnToast = (message = "Warning!") => {
    dismissToast();

    return toast.warn(message);
};

export const errorToast = (message = "Error!", data = {}) => {
    dismissToast();
    return toast.error(message, data);
};
export const dismissToast = () => {
    return toast.dismiss();
};
