import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchUserSubscriptions,
    fetchAvailableSubscriptions,
} from "../../Services/subscription.service";

export const getUserSubscriptions = createAsyncThunk(
    "subscriptions/getUserSubscriptions",
    async userId => {
        const data = await fetchUserSubscriptions(userId);
        return data;
    },
);

export const getAvailableSubscriptions = createAsyncThunk(
    "subscriptions/getAvailableSubscriptions",
    async () => {
        const data = await fetchAvailableSubscriptions();
        return data;
    },
);

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState: {
        userSubscriptions: [],
        availableSubscriptions: [],
        loading: false,
        error: null,
    },
    reducers: {
        subscribeToPlan: (state, action) => {
            state.userSubscriptions.push(action.payload);
        },
        cancelSubscription: (state, action) => {
            state.userSubscriptions = state.userSubscriptions.filter(
                sub => sub.id !== action.payload,
            );
        },
        setUserSubscriptions: (state, action) => {
            state.userSubscriptions = action.payload;
            state.loading = false;
        },
        setAvailableSubscriptions: (state, action) => {
            state.availableSubscriptions = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUserSubscriptions.pending, state => {
                state.loading = true;
            })
            .addCase(getUserSubscriptions.fulfilled, (state, action) => {
                state.userSubscriptions = action.payload;
                state.loading = false;
            })
            .addCase(getUserSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getAvailableSubscriptions.fulfilled, (state, action) => {
                state.availableSubscriptions = action.payload;
            });
    },
});

export const {
    subscribeToPlan,
    cancelSubscription,
    setUserSubscriptions,
    setAvailableSubscriptions,
    setLoading,
    setError,
} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
