const validationService = (() => {

    // ================= AUTH VALIDATION =================
    function validateAuthForm(data, type) {

        const errors = {};

        if (!data.username || data.username.trim() === "") {
            errors.signupUsername = "Username is required";
        }

        if (!data.password || data.password.trim() === "") {
            errors.signupPassword = "Password is required";
        } else {
            const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/;

            if (!strongPassword.test(data.password)) {
                errors.signupPassword = "Must include letter, number & special character";
            }
        }

        if (type === "signup") {

            if (!data.confirmPassword || data.confirmPassword.trim() === "") {
                errors.signupConfirmPassword = "Confirm password is required";
            }
            else if (data.password !== data.confirmPassword) {
                errors.signupConfirmPassword = "Passwords do not match";
            }
        }

        return errors;
    }

    // ================= EMPLOYEE VALIDATION =================
    function validateEmployeeForm(data) {

        const errors = {};

        if (!data.firstName || data.firstName.trim() === "") {
            errors.firstName = "First name is required";
        }

        if (!data.lastName || data.lastName.trim() === "") {
            errors.lastName = "Last name is required";
        }

        if (!data.email) {
            errors.email = "Email required";
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(data.email)) {
                errors.email = "Invalid email format";
            }
        }

        if (!data.phone || data.phone.length !== 10) {
            errors.phone = "Phone must be 10 digits";
        }

        if (!data.department) {
            errors.department = "Please select department";
        }

        if (!data.designation) {
            errors.designation = "Designation required";
        }

        if (!data.salary || Number(data.salary) <= 0) {
            errors.salary = "Salary must be positive";
        }

        if (!data.joinDate) {
            errors.joinDate = "Join date required";
        }

        return errors;
    }

    // ================= SERVER ERROR HANDLING =================
    function mapServerErrors(response) {

        const errors = {};

        // ASP.NET validation errors
        if (response && response.errors) {
            Object.keys(response.errors).forEach(key => {
                errors[key.toLowerCase()] = response.errors[key][0];
            });
        }

        // Custom API messages (like email exists)
        if (response && response.message) {
            errors.general = response.message;
        }

        return errors;
    }

    return {
        validateAuthForm,
        validateEmployeeForm,
        mapServerErrors
    };

})();