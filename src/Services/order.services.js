import { supabase } from "../supabaseClient";

// Create order in Supabase
export const createOrder = async orderData => {
    const { data, error } = await supabase.from("order").insert([orderData]).select();
    if (error) throw new Error(error.message);
    return data[0];
};

// Add order items
export const addOrderItems = async (orderId, items) => {
    const orderItems = items.map(item => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
    }));

    const { data, error } = await supabase.from("order_item").insert(orderItems).select();
    if (error) throw new Error(error.message);
    return data;
};

// Generate Razorpay Payment Link
export const createPaymentLink = async (orderId, amount, user) => {
    try {
        const response = await fetch("https://api.razorpay.com/v1/payment_links", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa("rzp_test_zveguFle8PSafn:XMNsvy61razcuTVT7EPuPW1D")}`,
            },
            body: JSON.stringify({
                amount: amount * 100,
                currency: "INR",
                accept_partial: false,
                customer: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone,
                },
                notify: { sms: true, email: true },
                callback_url: `https://yourwebsite.com/payment-success?orderId=${orderId}`,
                callback_method: "get",
            }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.description);
        return data.short_url;
    } catch (error) {
        console.error("Error creating payment link:", error);
        throw error;
    }
};

// Update payment status
export const updatePaymentStatus = async (orderId, razorpayPaymentId, razorpayStatus) => {
    const { data, error } = await supabase
        .from("payment_transaction")
        .insert([
            {
                order_id: orderId,
                razorpay_payment_id: razorpayPaymentId,
                razorpay_status: razorpayStatus,
            },
        ])
        .select();

    if (error) throw new Error(error.message);

    await supabase
        .from("orders")
        .update({
            payment_status_id: razorpayStatus === "paid" ? 2 : 3,
            order_status_id: razorpayStatus === "paid" ? 2 : 4,
        })
        .eq("id", orderId);
};
