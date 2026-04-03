const authService = (() => {

    let admin = { ...adminSeed };
    let currentSession = false;
    let currentUser = null;

    return {

        signup(username, password) {

            if (admin.username === username) {
                return {
                    success: false,
                    message: "Username already exists"
                };
            }

            admin = {
                username,
                password
            };

            return {
                success: true,
                message: "Signup successful"
            };
        },

        login(username, password) {

            if (admin.username === username && admin.password === password) {
                currentSession = true;
                currentUser = username;

                return {
                    success: true
                };
            }

            return {
                success: false,
                message: "Invalid credentials"
            };
        },

        logout() {
            currentSession = false;
            currentUser = null;
        },

        isLoggedIn() {
            return currentSession;
        },

        getCurrentUser() {
            return currentUser;
        },

        // ADD THIS FUNCTION HERE
        updateAdmin(username, password) {

            if (!username || !password) {
                return {
                    success: false,
                    message: "All fields are required"
                };
            }

            admin = {
                username,
                password
            };

            currentUser = username;

            return {
                success: true,
                message: "Admin updated successfully"
            };
        }

    };

})();