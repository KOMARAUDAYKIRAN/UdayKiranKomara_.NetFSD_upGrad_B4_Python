const validationService = (() => {

    function validateAuthForm(data, type) {

        const errors = {};

        if (!data.username || data.username.trim() === "") {
            errors.username = "Username is required";
        }

        if (!data.password || data.password.trim() === "") {
            errors.password = "Password is required";
        }

        if (type === "signup") {

            // Username
            if (!data.username || data.username.trim() === "") {
                errors.signupUsername = "Username is required";
            }

            // Password
            if (!data.password || data.password.trim() === "") {
                errors.signupPassword = "Password is required";
            }
            else {
                const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/;

                if (!strongPassword.test(data.password)) {
                    errors.signupPassword = "Must include letter, number & special character";
                }
            }

            // Confirm Password
            if (!data.confirmPassword || data.confirmPassword.trim() === "") {
                errors.signupConfirmPassword = "Confirm password is required";
            }
            else if (data.password !== data.confirmPassword) {
                errors.signupConfirmPassword = "Passwords do not match";
            }
        }
        return errors;
    }

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

            const employees = employeeService.getAll();

            const duplicate = employees.find(
                emp => emp.email === data.email && emp.id !== Number(data.id)
            );

            if (duplicate) {
                errors.email = "Email already exists";
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

    return {
        validateAuthForm,
        validateEmployeeForm
    };

})();