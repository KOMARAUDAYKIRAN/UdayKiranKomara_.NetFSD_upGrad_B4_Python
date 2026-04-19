const authService = (() => {

    let session = null;

    //  Role → Permissions mapping
    const ROLE_PERMISSIONS = {
        admin: ["create", "read", "update", "delete"],
        viewer: ["read"]
    };

    return {

        // ================= LOGIN =================
        login: async (username, password) => {
            try {
                const res = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    console.error("Login failed:", data);
                    return { success: false, message: data.message || "Login failed" };
                }

                if (data.success) {
                    session = data;

                    // Normalize role to lowercase
                    const role = data.role?.toLowerCase();

                    // Save in localStorage
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", role);
                }

                return data;

            } catch (err) {
                console.error("Login Error:", err);
                return { success: false, message: "Server not reachable" };
            }
        },

        // ================= SIGNUP =================
        signup: async (username, password, role) => {
            try {
                const res = await fetch(`${CONFIG.API_BASE_URL}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password, role })
                });

                const data = await res.json();

                if (!res.ok) {
                    console.error("Signup failed:", data);
                    return { success: false, message: data.message || "Signup failed" };
                }

                return data;

            } catch (err) {
                console.error("Signup Error:", err);
                return { success: false, message: "Server not reachable" };
            }
        },

        // ================= TOKEN =================
        getToken: () => {
            return localStorage.getItem("token");
        },

        getRole: () => {
            return localStorage.getItem("role") || "viewer";
        },

        // Check if admin
        isAdmin: () => {
            return localStorage.getItem("role") === "admin";
        },

        // Generic permission checker (BEST PRACTICE)
        hasPermission: (permission) => {
            const role = localStorage.getItem("role") || "viewer";
            return ROLE_PERMISSIONS[role]?.includes(permission);
        },

        // ================= LOGOUT =================
        logout: () => {
            session = null;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }

    };

})();