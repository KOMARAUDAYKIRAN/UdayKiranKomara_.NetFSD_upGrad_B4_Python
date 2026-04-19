$(document).ready(function () {

    function loadDashboard() {
        uiService.renderDashboardCards(dashboardService.getSummary());
        uiService.renderDepartmentBreakdown(dashboardService.getDepartmentBreakdown());
        uiService.renderRecentEmployees(dashboardService.getRecentEmployees());
    }

    function loadEmployees() {
        uiService.renderEmployeeTable(employeeService.getAll());
    }

    function populateDepartmentFilter() {

        const employees = employeeService.getAll();

        const departments = [...new Set(employees.map(e => e.department))];

        let options = `<option value="">All Departments</option>`;

        departments.forEach(dept => {
            options += `<option value="${dept}">${dept}</option>`;
        });

        $("#departmentFilter").html(options);
    }

    $("#showLogin").click(function () {
        $("#signupSection").addClass("d-none");
        $("#loginSection").removeClass("d-none");
    });

    $("#showSignup").click(function () {
        $("#loginSection").addClass("d-none");
        $("#signupSection").removeClass("d-none");
    });

    $("#signupForm").submit(function (e) {
        e.preventDefault();

        const data = {
            username: $("#signupUsername").val(),
            password: $("#signupPassword").val(),
            confirmPassword: $("#signupConfirmPassword").val()
        };

        const errors = validationService.validateAuthForm(data, "signup");

        if (Object.keys(errors).length > 0) {
            uiService.showInlineErrors(errors);
            return;
        }
        // Password validation (live)
        $("#signupPassword").on("input", function () {

            const password = $(this).val();
            const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/;

            if (!strongPassword.test(password)) {
                $("#signupPasswordError").text("Must include letter, number & special character");
            } else {
                $("#signupPasswordError").text("");
            }
        });

        // Confirm password validation (live)
        $("#signupConfirmPassword").on("input", function () {

            const password = $("#signupPassword").val();
            const confirm = $(this).val();

            if (confirm !== password) {
                $("#signupConfirmPasswordError").text("Passwords do not match");
            } else {
                $("#signupConfirmPasswordError").text("");
            }
        });
        const result = authService.signup(data.username, data.password);

        if (result.success) {
            uiService.showToast("Signup successful");
            $("#showLogin").click();
        }
    });

    $("#loginForm").submit(function (e) {
        e.preventDefault();

        const result = authService.login(
            $("#loginUsername").val(),
            $("#loginPassword").val()
        );

        if (result.success) {
            $("#loginSection").addClass("d-none");
            $("#mainNavbar").removeClass("d-none");
            $("#dashboardSection").removeClass("d-none");

            loadDashboard();
            loadEmployees();
            populateDepartmentFilter();
        } else {
            uiService.showToast("Invalid credentials");
        }
    });

    $(".nav-toggle").click(function () {

        $("section").addClass("d-none");

        $("#" + $(this).data("target")).removeClass("d-none");
    });

    $("#logoutBtn").click(function () {
        authService.logout();

        $("section").addClass("d-none");
        $("#mainNavbar").addClass("d-none");
        $("#loginSection").removeClass("d-none");
    });
    // Open admin modal
    $("#adminProfileBtn").click(function () {

        $("#adminUsername").val(authService.getCurrentUser());

        new bootstrap.Modal(document.getElementById("adminModal")).show();
    });

    $("#saveAdminBtn").click(function () {

        const username = $("#adminUsername").val().trim();
        const password = $("#adminPassword").val().trim();

        const result = authService.updateAdmin(username, password);

        if (!result.success) {
            uiService.showToast(result.message);
            return;
        }

        $("#adminPassword").val("");

        bootstrap.Modal.getInstance(document.getElementById("adminModal")).hide();

        uiService.showToast(result.message);
    });
    $(document).on("click", ".editBtn", function () {

        const emp = employeeService.getById($(this).data("id"));

        uiService.populateForm(emp);

        $("#employeeModalTitle").text("Edit Employee");

        new bootstrap.Modal(document.getElementById("employeeModal")).show();
    });
    $("#saveEmployeeBtn").click(function () {

        const data = {
            id: Number($("#employeeId").val()),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            department: $("#department").val(),
            designation: $("#designation").val(),
            salary: $("#salary").val(),
            joinDate: $("#joinDate").val(),
            status: $("#status").val()
        };
        const errors = validationService.validateEmployeeForm(data);

        if (Object.keys(errors).length > 0) {
            uiService.showInlineErrors(errors);
            return;
        }

        if (data.id) {
            employeeService.update(data.id, data);
            uiService.showToast("Employee updated");
        } else {
            employeeService.add(data);
            uiService.showToast("Employee added");
        }

        bootstrap.Modal.getInstance(document.getElementById("employeeModal")).hide();

        loadEmployees();
        loadDashboard();
        populateDepartmentFilter();
    });




    $("#addEmployeeBtn").click(function () {
        uiService.clearForm();
        $("#employeeModalTitle").text("Add Employee");
        new bootstrap.Modal(document.getElementById("employeeModal")).show();
    });

    $("#saveEmployeeBtn").click(function () {

        const data = {
            id: $("#employeeId").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            department: $("#department").val(),
            designation: $("#designation").val(),
            salary: $("#salary").val(),
            joinDate: $("#joinDate").val(),
            status: $("#status").val()
        };

        const errors = validationService.validateEmployeeForm(data);

        if (Object.keys(errors).length > 0) {
            uiService.showInlineErrors(errors);
            return;
        }

        if (data.id) {
            employeeService.update(data.id, data);
            uiService.showToast("Employee updated");
        } else {
            employeeService.add(data);
            uiService.showToast("Employee added");
        }

        bootstrap.Modal.getInstance(document.getElementById("employeeModal")).hide();

        loadEmployees();
        loadDashboard();
        populateDepartmentFilter();
    });

    $("#searchInput").on("input", function () {

        const search = $(this).val();
        const dept = $("#departmentFilter").val();

        const result = employeeService.applyFilters(search, dept, "");

        uiService.renderEmployeeTable(result);
    });

    $("#departmentFilter").change(function () {

        const search = $("#searchInput").val();
        const dept = $(this).val();

        const result = employeeService.applyFilters(search, dept, "");

        uiService.renderEmployeeTable(result);
    });

    $("#sortSelect").change(function () {

        const val = $(this).val();

        let result = employeeService.getAll();

        if (val === "nameAsc") {
            result = employeeService.sortBy("name", "asc");
        }

        if (val === "nameDesc") {
            result = employeeService.sortBy("name", "desc");
        }

        if (val === "salaryAsc") {
            result = employeeService.sortBy("salary", "asc");
        }

        if (val === "salaryDesc") {
            result = employeeService.sortBy("salary", "desc");
        }

        uiService.renderEmployeeTable(result);
    });

    $(document).on("click", ".viewBtn", function () {
        const emp = employeeService.getById($(this).data("id"));
        uiService.showViewModal(emp);
    });

    let deleteId = null;

    $(document).on("click", ".deleteBtn", function () {
        deleteId = $(this).data("id");

        $("#deleteMessage").text("Are you sure you want to delete this employee?");
        new bootstrap.Modal(document.getElementById("deleteModal")).show();
    });

    $("#confirmDeleteBtn").click(function () {

        employeeService.remove(deleteId);

        bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();

        loadEmployees();
        loadDashboard();

        uiService.showToast("Employee deleted successfully");
    });


    let currentStatus = "";
    $(".status-filter").click(function () {

        currentStatus = $(this).data("status");

        const search = $("#searchInput").val();
        const dept = $("#departmentFilter").val();

        const result = employeeService.applyFilters(search, dept, currentStatus);

        uiService.renderEmployeeTable(result);
    });

});