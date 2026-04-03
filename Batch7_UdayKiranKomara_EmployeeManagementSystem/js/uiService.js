const uiService = (() => {

    function renderEmployeeTable(employees) {

        let rows = "";

        if (employees.length === 0) {
            rows = `
                <tr>
                    <td colspan="9" class="text-center text-danger">No employees found</td>
                </tr>
            `;
        } else {

            employees.forEach(emp => {

                rows += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.firstName} ${emp.lastName}</td>
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
                            <button class="btn btn-sm btn-info viewBtn" data-id="${emp.id}">
                                <i class="bi bi-eye"></i>
                            </button>

                            <button class="btn btn-sm btn-warning editBtn" data-id="${emp.id}">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button class="btn btn-sm btn-danger deleteBtn" data-id="${emp.id}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        $("#employeeTableBody").html(rows);
    }

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

        const colors = {
            Engineering: "bg-primary",
            Marketing: "bg-warning",
            HR: "bg-info",
            Finance: "bg-success",
            Operations: "bg-secondary"
        };

        for (let dept in data) {

            const percent = Math.round((data[dept] / total) * 100);

            html += `
            <tr>
                <td>
                    <span class="badge ${colors[dept] || "bg-dark"}">
                        ${dept}
                    </span>
                </td>

                <td>${data[dept]}</td>

                <td>
                    <div class="progress">
                        <div class="progress-bar ${colors[dept] || "bg-dark"}" 
                             style="width:${percent}%">
                        </div>
                    </div>
                </td>

                <td>${percent}%</td>
            </tr>
        `;
        }

        html += `
                </tbody>
            </table>
        </div>
    `;

        $("#departmentBreakdown").html(html);
    }
    function renderRecentEmployees(employees) {

        let html = "";

        employees.forEach(emp => {

            const initials = emp.firstName.charAt(0) + emp.lastName.charAt(0);

            html += `
            <div class="d-flex align-items-center justify-content-between border-bottom py-2">
                
                <div class="d-flex align-items-center">
                    <div class="avatar">${initials}</div>
                    <div class="ms-2">
                        <strong>${emp.firstName} ${emp.lastName}</strong><br>
                        <small>${emp.designation}</small>
                    </div>
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
        const toast = new bootstrap.Toast(document.getElementById("mainToast"));
        toast.show();
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
            <h4 class="text-primary">${emp.firstName} ${emp.lastName}</h4>
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
        renderDashboardCards,
        renderDepartmentBreakdown,
        renderRecentEmployees,
        populateForm,
        clearForm,
        showToast,
        showInlineErrors,
        showViewModal
    };

})();