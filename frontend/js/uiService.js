const uiService = (() => {

    // ================= EMPLOYEE TABLE =================
    function renderEmployeeTable(employees) {

        const role = authService.getRole()?.toLowerCase();
        let rows = "";

        if (!employees || employees.length === 0) {
            rows = `
                <tr>
                    <td colspan="9" class="text-center text-danger">
                        No employees found
                    </td>
                </tr>
            `;
        } else {

            employees.forEach(emp => {

                rows += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.fullName}</td>
                        <td>${emp.email}</td>
                        <td><span class="badge bg-primary">${emp.department}</span></td>
                        <td>${emp.designation}</td>
                        <td>₹${Number(emp.salary).toLocaleString('en-IN')}</td>
                        <td>${emp.joinDate}</td>
                        <td>
                            <span class="badge ${emp.status === "Active" ? "bg-success" : "bg-danger"}">
                                ${emp.status}
                            </span>
                        </td>
                        <td>

                            <!-- ✅ VIEW FOR ALL -->
                            <button class="btn btn-sm btn-info viewBtn" data-id="${emp.id}">
                                <i class="bi bi-eye"></i>
                            </button>

                            <!-- ✅ ADMIN ONLY -->
                            ${role === "admin" ? `
                                <button class="btn btn-sm btn-warning editBtn" data-id="${emp.id}">
                                    <i class="bi bi-pencil"></i>
                                </button>

                                <button class="btn btn-sm btn-danger deleteBtn" data-id="${emp.id}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            ` : ""}

                        </td>
                    </tr>
                `;
            });
        }

        $("#employeeTableBody").html(rows);
    }

    // ================= PAGINATION =================
    function renderPagination(meta) {

        let html = "";

        for (let i = 1; i <= meta.totalPages; i++) {
            html += `
                <button class="btn btn-sm ${i === meta.page ? "btn-primary" : "btn-light"} pageBtn" data-page="${i}">
                    ${i}
                </button>
            `;
        }

        $("#pagination").html(html);
    }

    // ================= ROLE CONTROL =================
    function applyRoleUI() {

        const role = authService.getRole()?.toLowerCase();

        // ✅ ADD EMPLOYEE BUTTON CONTROL
        if (role === "admin") {
            $("#addEmployeeBtn").show();
        } else {
            $("#addEmployeeBtn").hide();
        }
    }

    // ================= DASHBOARD =================
    function renderDashboardCards(summary) {

        const cards = `
        <div class="col-md-3">
            <div class="card shadow-sm p-3 border-start border-primary border-4">
                <h6>Total Employees</h6>
                <h2 class="text-primary">${summary.total}</h2>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card shadow-sm p-3 border-start border-success border-4">
                <h6>Active</h6>
                <h2 class="text-success">${summary.active}</h2>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card shadow-sm p-3 border-start border-danger border-4">
                <h6>Inactive</h6>
                <h2 class="text-danger">${summary.inactive}</h2>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card shadow-sm p-3 border-start border-warning border-4">
                <h6>Departments</h6>
                <h2 class="text-warning">${summary.departments}</h2>
            </div>
        </div>
        `;

        $("#dashboardCards").html(cards);
    }

    // ================= DEPARTMENT BREAKDOWN =================
    function renderDepartmentBreakdown(data) {

        let html = `
        <div class="table-responsive">
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Count</th>
                        <th>Distribution</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
        `;

        const total = Object.values(data).reduce((a, b) => a + b, 0);

        for (let dept in data) {

            const percent = Math.round((data[dept] / total) * 100);

            html += `
            <tr>
                <td><span class="badge bg-primary">${dept}</span></td>
                <td>${data[dept]}</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-primary" style="width:${percent}%"></div>
                    </div>
                </td>
                <td>${percent}%</td>
            </tr>
            `;
        }

        html += `</tbody></table></div>`;

        $("#departmentBreakdown").html(html);
    }

    // ================= RECENT EMPLOYEES =================
    function renderRecentEmployees(employees) {

        let html = "";

        employees.forEach(emp => {

            html += `
            <div class="d-flex justify-content-between border-bottom py-2">
                <div>
                    <strong>${emp.fullName}</strong><br>
                    <small>${emp.designation}</small>
                </div>
                <div>
                    <span class="badge bg-primary">${emp.department}</span>
                    <span class="badge ${emp.status === "Active" ? "bg-success" : "bg-danger"}">
                        ${emp.status}
                    </span>
                </div>
            </div>
            `;
        });

        $("#recentEmployees").html(html);
    }

    // ================= FORM =================
    function populateForm(emp) {

        $("#employeeId").val(emp.id);
        $("#firstName").val(emp.firstName);
        $("#lastName").val(emp.lastName);
        $("#email").val(emp.email);
        $("#phone").val(emp.phone);
        $("#department").val(emp.department);
        $("#designation").val(emp.designation);
        $("#salary").val(emp.salary);
        $("#joinDate").val(emp.joinDate);
        $("#status").val(emp.status);
    }

    function clearForm() {
        $("#employeeForm")[0].reset();
        $("#employeeId").val("");
    }

    function showToast(message) {
        $("#toastMessage").text(message);
        new bootstrap.Toast(document.getElementById("mainToast")).show();
    }

    function showInlineErrors(errors) {
        $(".error").text("");

        Object.keys(errors).forEach(key => {
            $(`#${key}Error`).text(errors[key]);
        });
    }

    function showViewModal(emp) {

        $("#viewEmployeeContent").html(`
        <div class="card shadow p-3">
            <h4 class="text-primary">${emp.fullName}</h4>
            <hr>
            <p><strong>Email:</strong> ${emp.email}</p>
            <p><strong>Phone:</strong> ${emp.phone}</p>
            <p><strong>Department:</strong> ${emp.department}</p>
            <p><strong>Designation:</strong> ${emp.designation}</p>
            <p><strong>Salary:</strong> ₹${Number(emp.salary).toLocaleString('en-IN')}</p>
            <p>
                <strong>Status:</strong> 
                <span class="badge ${emp.status === "Active" ? "bg-success" : "bg-danger"}">
                    ${emp.status}
                </span>
            </p>
        </div>
        `);

        new bootstrap.Modal(document.getElementById("viewModal")).show();
    }

    return {
        renderEmployeeTable,
        renderPagination,
        renderDashboardCards,
        renderDepartmentBreakdown,
        renderRecentEmployees,
        populateForm,
        clearForm,
        showToast,
        showInlineErrors,
        showViewModal,
        applyRoleUI
    };

})();