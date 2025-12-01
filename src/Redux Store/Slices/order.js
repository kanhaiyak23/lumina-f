import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createOrder,
    addOrderItems,
    createPaymentLink,
    updatePaymentStatus,
} from "../../Services/order.services";

export const processOrder = createAsyncThunk(
    "order/processOrder",
    async ({ user, cartItems }, { rejectWithValue }) => {
        try {
            // 1️⃣ Create order in Supabase
            const order = await createOrder({
                user_id: user.id,
                total_price: cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                ),
                payment_status_id: 1, // Pending
                order_status_id: 1, // Created
            });

            // 2️⃣ Add order items to `order_items` table
            await addOrderItems(order.id, cartItems);

            // 3️⃣ Generate Razorpay payment link
            const paymentLink = await createPaymentLink(order.id, order.total_price, user);

            return { order, paymentLink };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const updatePayment = createAsyncThunk(
    "order/updatePayment",
    async ({ orderId, razorpayPaymentId, razorpayStatus }, { rejectWithValue }) => {
        try {
            await updatePaymentStatus(orderId, razorpayPaymentId, razorpayStatus);
            return { orderId, paymentStatus: razorpayStatus };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: null,
        paymentLink: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(processOrder.pending, state => {
                state.status = "loading";
            })
            .addCase(processOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.order = action.payload.order;
                state.paymentLink = action.payload.paymentLink;
            })
            .addCase(processOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                if (state.order?.id === action.payload.orderId) {
                    state.order.payment_status_id = action.payload.paymentStatus;
                }
            });
    },
});

export default orderSlice.reducer;
