import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: JSON.parse(localStorage.getItem("user_data")) || {},
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    phoneRequired: false,
    toastMessage: null,
    reducers: {
        logout: state => {
            sessionStorage.clear();
            localStorage.removeItem("user_data");

            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        },

        setTokens: (_, action) => {
            const { access_token, refresh_token } = action.payload;
            sessionStorage.setItem("access_token", access_token);
            sessionStorage.setItem("refresh_token", refresh_token);
        },

        removeTokens: () => {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("refresh_token");
        },

        setUserData: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem("user_data", JSON.stringify(action.payload));
        },
        setPhoneRequired: (state, action) => {
            state.phoneRequired = action.payload;
        },
        setToastMessage: (state, action) => {
            state.toastMessage = action.payload;
        },

        clearToastMessage: state => {
            state.toastMessage = null;
        },
    },
});

// Mock fetchUser for static app
export const fetchUser = () => async dispatch => {
    // Static app - user data comes from localStorage only
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
        dispatch(setUserData(JSON.parse(storedUser)));
    }
};

export const {
    logout,
    setTokens,
    removeTokens,
    setUserData,
    setPhoneRequired,
    setToastMessage,
    clearToastMessage,
    updateUser,
} = authSlice.actions;
export default authSlice.reducer;
