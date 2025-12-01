// axiosInterceptor.js
import axios from "axios";
import { userRefreshUrl } from "./urls";
import { errorToast } from "./toasts";
import store from "../Redux Store/store";
import { logout } from "../Redux Store/Slices/auth";

// Your API endpoint for refreshing the token
const refreshEndpoint = userRefreshUrl;

// Add a request interceptor globally
axios.interceptors.request.use(
    async config => {
        // Check if access_token is available and not expired
        const accessToken = sessionStorage.getItem("access_token") || null;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    response => response,
    async error => {
        // console.log(error);
        if (error?.response?.status === 401) {
            const newToken = await refreshToken();
            if (newToken?.success && newToken?.access_token) {
                sessionStorage.setItem("access_token", newToken?.access_token);

                // Retry the original request
                return axios(error.config);
            } else {
                //! Logout logic
                errorToast("Session Expired, Please Login Again");
                store.dispatch(logout());
                return Promise.reject(error);
            }
        }
        // else {
        //   console.log("else Error => ", error);
        //   toast.error("Session Expired, Please Login Again");
        //   store.dispatch(logout());
        // }
        return Promise.reject(error);
    },
);

function refreshToken() {
    return new Promise((resolve, reject) => {
        const _refresh_token = sessionStorage.getItem("refresh_token") || null;
        fetch(refreshEndpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${_refresh_token}`,
            },
        })
            .then(response => response.json())
            .then(res => {
                // console.log("refresh Data => ", res);
                resolve({ success: true, access_token: res?.data?.access_token });
            })
            .catch(err => {
                resolve({ success: false });
            });
    });
}
