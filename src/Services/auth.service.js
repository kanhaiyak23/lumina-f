class AuthService {
    async register({ email, password, name, contact }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Accept any registration
                resolve({
                    success: true,
                    message: "Registration successful!",
                });
            }, 1000);
        });
    }

    async login({ email, password }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Accept any email and password
                if (email && password) {
                    resolve({
                        success: true,
                        data: {
                            id: "user_" + Date.now(),
                            name: email.split('@')[0],
                            email: email,
                            mobile_number: "0000000000",
                        },
                        message: "Login successful!",
                    });
                } else {
                    resolve({
                        success: false,
                        message: "Please enter email and password.",
                    });
                }
            }, 1000);
        });
    }

    async signOut() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: "Signed out successfully!" });
            }, 500);
        });
    }
}

export const authService = new AuthService();
