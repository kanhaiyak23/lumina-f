import { supabase } from "../supabaseClient";

export const fetchUserSubscriptions = async userId => {
    try {
        const { data, error } = await supabase
            .from("subscribers")
            .select("subscription_id,id, subscription(*)") // Joining subscriptions table
            .eq("user_id", userId);

        if (error) throw error;

        return data.map(subscription => ({
            id: subscription.subscription_id,
            title: subscription.subscription.Plan,
            description: subscription.subscription.Description || "No description available",
            frequency: subscription.subscription.frequency || "Unknown",
            microgreens: subscription.subscription.Microgreens || [],
            size: subscription.subscription.size || "Unknown",
            price: subscription.subscription.price || 0,
            // isActive: new Date(subscription.end_date) > new Date(),
            paymentDueDate: subscription.end_date,
        }));
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        return [];
    }
};
export const fetchAvailableSubscriptions = async () => {
    try {
        const { data, error } = await supabase
            .from("subscription") // Ensure table name is correct
            .select("*");

        if (error) {
            console.error("Error fetching available subscriptions:", error);
            return [];
        }

        return data.map(subscription => ({
            id: subscription.id,
            title: subscription.Plan,
            description: subscription.Description || "No description available",
            frequency: subscription.frequency || "Weekly",
            microgreens: subscription.microgreens || ["Sunflower", "Radish"],
            size: subscription.size || "Medium",
            price: subscription.price,
        }));
    } catch (error) {
        console.error("Error fetching available subscriptions:", error);
        return [];
    }
};
