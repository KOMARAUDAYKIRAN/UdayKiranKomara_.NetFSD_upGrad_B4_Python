const employeeService = (() => {

    function getAll() {
        return storageService.getAll();
    }

    function getById(id) {
        return storageService.getById(id);
    }

    function add(data) {
        const newEmployee = {
            id: storageService.nextId(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            department: data.department,
            designation: data.designation,
            salary: Number(data.salary),
            joinDate: data.joinDate,
            status: data.status
        };

        storageService.add(newEmployee);
        return newEmployee;
    }

    function update(id, data) {
        storageService.update(id, data);
    }

    function remove(id) {
        storageService.remove(id);
    }

    function search(query) {
        const employees = storageService.getAll();

        if (!query) return employees;

        const lowerQuery = query.toLowerCase();

        return employees.filter(emp => {
            const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
            const email = emp.email.toLowerCase();

            return fullName.includes(lowerQuery) || email.includes(lowerQuery);
        });
    }

    function filterByDepartment(dept) {
        const employees = storageService.getAll();

        if (!dept) return employees;

        return employees.filter(emp => emp.department === dept);
    }

    function filterByStatus(status) {
        const employees = storageService.getAll();

        if (!status) return employees;

        return employees.filter(emp => emp.status === status);
    }

    function applyFilters(searchQuery, dept, status) {
        let employees = storageService.getAll();

        if (searchQuery) {
            const lower = searchQuery.toLowerCase();

            employees = employees.filter(emp => {
                const name = `${emp.firstName} ${emp.lastName}`.toLowerCase();
                return name.includes(lower) || emp.email.toLowerCase().includes(lower);
            });
        }

        if (dept) {
            employees = employees.filter(emp => emp.department === dept);
        }

        if (status) {
            employees = employees.filter(emp => emp.status === status);
        }

        return employees;
    }

    function sortBy(field, direction = "asc") {
        const employees = [...storageService.getAll()];

        employees.sort((a, b) => {

            let valA = a[field];
            let valB = b[field];

            if (field === "name") {
                valA = a.lastName.toLowerCase();
                valB = b.lastName.toLowerCase();
            }

            if (field === "joinDate") {
                valA = new Date(a.joinDate);
                valB = new Date(b.joinDate);
            }

            if (valA < valB) return direction === "asc" ? -1 : 1;
            if (valA > valB) return direction === "asc" ? 1 : -1;

            return 0;
        });

        return employees;
    }

    return {
        getAll,
        getById,
        add,
        update,
        remove,
        search,
        filterByDepartment,
        filterByStatus,
        applyFilters,
        sortBy
    };

})();