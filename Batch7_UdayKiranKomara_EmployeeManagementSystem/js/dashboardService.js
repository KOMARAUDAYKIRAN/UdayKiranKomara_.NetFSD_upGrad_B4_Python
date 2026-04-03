const dashboardService = (() => {

    function getSummary() {

        const employees = employeeService.getAll();

        const total = employees.length;

        const active = employees.filter(e => e.status === "Active").length;

        const inactive = employees.filter(e => e.status === "Inactive").length;

        const departments = new Set(
            employees.map(e => e.department)
        ).size;

        return {
            total,
            active,
            inactive,
            departments
        };
    }

    function getDepartmentBreakdown() {

        const employees = employeeService.getAll();

        const result = {};

        employees.forEach(emp => {

            if (!result[emp.department]) {
                result[emp.department] = 0;
            }

            result[emp.department]++;
        });

        return result;
    }

    function getRecentEmployees(n = 5) {

        const employees = employeeService.getAll();

        return employees
            .sort((a, b) => b.id - a.id)
            .slice(0, n);
    }

    return {
        getSummary,
        getDepartmentBreakdown,
        getRecentEmployees
    };

})();