$(document).ready(function () {

    // ================= GLOBAL STATE =================
    let state = {
        page: 1,
        pageSize: 10,
        search: "",
        department: "",
        status: "",
        sortBy: "name",
        sortDir: "asc"
    };

    // ================= DASHBOARD =================
    async function loadDashboard() {
        const data = await dashboardService.getSummary();

        uiService.renderDashboardCards(data);
        uiService.renderDepartmentBreakdown(data.departmentBreakdown);
        uiService.renderRecentEmployees(data.recentEmployees);
    }

    // ================= EMPLOYEES =================
    async function loadEmployees() {

        const result = await employeeService.getAll(state);

        uiService.renderEmployeeTable(result.data);
        uiService.renderPagination(result);
    }

    // ================= DEPARTMENT FILTER =================
    async function populateDepartmentFilter() {

        const result = await employeeService.getAll({ page: 1, pageSize: 100 });
        const employees = result.data;

        const departments = [...new Set(employees.map(e => e.department))];

        let options = `<option value="">All Departments</option>`;

        departments.forEach(dept => {
            options += `<option value="${dept}">${dept}</option>`;
        });

        $("#departmentFilter").html(options);
    }

    // ================= AUTH NAVIGATION =================
    $("#showLogin").click(function () {
        $("#signupSection").addClass("d-none");
        $("#loginSection").removeClass("d-none");
    });

    $("#showSignup").click(function () {
        $("#loginSection").addClass("d-none");
        $("#signupSection").removeClass("d-none");
    });

    // ================= SIGNUP =================
    $("#signupForm").submit(async function (e) {
        e.preventDefault();

        const data = {
            username: $("#signupUsername").val(),
            password: $("#signupPassword").val(),
            confirmPassword: $("#signupConfirmPassword").val()
        };

        //  VALIDATE FIRST
        const errors = validationService.validateAuthForm(data, "signup");

        if (Object.keys(errors).length > 0) {
            uiService.showInlineErrors(errors);
            return;
        }

        const result = await authService.signup(data.username, data.password, "Admin");

        if (result.success) {
            uiService.showToast("Signup successful");
            $("#showLogin").click();
        } else {
            uiService.showToast(result.message);
        }
    });
    // ================= LOGIN =================
    $("#loginForm").submit(async function (e) {
        e.preventDefault();

        const result = await authService.login(
            $("#loginUsername").val(),
            $("#loginPassword").val()
        );
        if (result.success) {

            $("#loginSection").addClass("d-none");
            $("#mainNavbar").removeClass("d-none");

            $("section").addClass("d-none");
            $("#dashboardSection").removeClass("d-none");

            //  MUST BE HERE
            uiService.applyRoleUI();

            await loadDashboard();
            await loadEmployees();
            await populateDepartmentFilter();
        } else {
            uiService.showToast("Invalid credentials");
        }
    });

    // ================= NAVIGATION =================
    $(".nav-toggle").click(function () {

        const target = $(this).data("target");

        // Hide all sections
        $("section").addClass("d-none");

        // Show selected section
        $("#" + target).removeClass("d-none");

    });
    // ================= LOGOUT =================
    $("#logoutBtn").click(function () {
        authService.logout();

        $("section").addClass("d-none");
        $("#mainNavbar").addClass("d-none");
        $("#loginSection").removeClass("d-none");
    });

    // ================= SEARCH =================
    $("#searchInput").on("input", function () {
        state.search = $(this).val();
        state.page = 1;
        loadEmployees();
    });

    // ================= FILTER =================
    $("#departmentFilter").change(function () {
        state.department = $(this).val();
        state.page = 1;
        loadEmployees();
    });

    $(".status-filter").click(function () {
        state.status = $(this).data("status");
        state.page = 1;
        loadEmployees();
    });

    // ================= SORT =================
    $("#sortSelect").change(function () {

        const val = $(this).val();

        if (val === "nameAsc") {
            state.sortBy = "name";
            state.sortDir = "asc";
        }
        if (val === "nameDesc") {
            state.sortBy = "name";
            state.sortDir = "desc";
        }
        if (val === "salaryAsc") {
            state.sortBy = "salary";
            state.sortDir = "asc";
        }
        if (val === "salaryDesc") {
            state.sortBy = "salary";
            state.sortDir = "desc";
        }
        if (val === "dateAsc") {
            state.sortBy = "joinDate";
            state.sortDir = "asc";
        }
        if (val === "dateDesc") {
            state.sortBy = "joinDate";
            state.sortDir = "desc";
        }

        loadEmployees();
    });

    // ================= PAGINATION =================
    $(document).on("click", ".pageBtn", function () {
        state.page = $(this).data("page");
        loadEmployees();
    });

    // ================= ADD EMPLOYEE =================
    $("#addEmployeeBtn").click(function () {
        uiService.clearForm();
        $("#employeeModalTitle").text("Add Employee");
        new bootstrap.Modal(document.getElementById("employeeModal")).show();
    });

    // ================= EDIT EMPLOYEE =================
    $(document).on("click", ".editBtn", async function () {

        const emp = await employeeService.getById($(this).data("id"));

        uiService.populateForm(emp);

        $("#employeeModalTitle").text("Edit Employee");

        new bootstrap.Modal(document.getElementById("employeeModal")).show();
    });

    // ================= SAVE EMPLOYEE =================
    $("#saveEmployeeBtn").click(async function () {

        const data = {
            id: Number($("#employeeId").val()),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            department: $("#department").val(),
            designation: $("#designation").val(),
            salary: Number($("#salary").val()),
            joinDate: $("#joinDate").val(),
            status: $("#status").val()
        };

        const errors = validationService.validateEmployeeForm(data);

        if (Object.keys(errors).length > 0) {
            uiService.showInlineErrors(errors);
            return;
        }

        let res;

        if (data.id) {
            res = await employeeService.update(data.id, data);
            uiService.showToast("Employee updated");
        } else {
            res = await employeeService.add(data);

            if (res.success === false) {
                uiService.showToast(res.message);
                return;
            }

            uiService.showToast("Employee added");
        }

        bootstrap.Modal.getInstance(document.getElementById("employeeModal")).hide();

        await loadEmployees();
        await loadDashboard();
        await populateDepartmentFilter();
    });

    // ================= VIEW =================
    $(document).on("click", ".viewBtn", async function () {
        const emp = await employeeService.getById($(this).data("id"));
        uiService.showViewModal(emp);
    });

    // ================= DELETE =================
    let deleteId = null;

    $(document).on("click", ".deleteBtn", function () {
        deleteId = $(this).data("id");

        $("#deleteMessage").text("Are you sure you want to delete this employee?");
        new bootstrap.Modal(document.getElementById("deleteModal")).show();
    });

    $("#confirmDeleteBtn").click(async function () {

        await employeeService.remove(deleteId);

        bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();

        await loadEmployees();
        await loadDashboard();

        uiService.showToast("Employee deleted successfully");
    });

});