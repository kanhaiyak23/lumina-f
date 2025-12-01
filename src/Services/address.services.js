// Address service - using local storage for static app
export const addressService = {
    // Fetch all addresses for a user from localStorage
    async fetchAddresses(userId) {
        try {
            const addresses = JSON.parse(localStorage.getItem(`addresses_${userId}`) || '[]');
            return addresses;
        } catch (error) {
            console.error("Error fetching addresses:", error);
            return [];
        }
    },

    // Add a new address
    async addAddress(addressData) {
        try {
            const userId = addressData.user_id;
            const addresses = JSON.parse(localStorage.getItem(`addresses_${userId}`) || '[]');
            const newAddress = {
                ...addressData,
                id: Date.now().toString(),
                created_at: new Date().toISOString()
            };
            addresses.push(newAddress);
            localStorage.setItem(`addresses_${userId}`, JSON.stringify(addresses));
            return newAddress;
        } catch (error) {
            console.error("Error adding address:", error);
            throw error;
        }
    },

    // Update an existing address
    async updateAddress(addressId, addressData) {
        try {
            const userId = addressData.user_id;
            const addresses = JSON.parse(localStorage.getItem(`addresses_${userId}`) || '[]');
            const index = addresses.findIndex(addr => addr.id === addressId);
            if (index !== -1) {
                addresses[index] = { ...addresses[index], ...addressData };
                localStorage.setItem(`addresses_${userId}`, JSON.stringify(addresses));
                return addresses[index];
            }
            throw new Error('Address not found');
        } catch (error) {
            console.error("Error updating address:", error);
            throw error;
        }
    },

    // Delete an address
    async deleteAddress(addressId, userId) {
        try {
            const addresses = JSON.parse(localStorage.getItem(`addresses_${userId}`) || '[]');
            const filtered = addresses.filter(addr => addr.id !== addressId);
            localStorage.setItem(`addresses_${userId}`, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error("Error deleting address:", error);
            throw error;
        }
    },
};
