const storageService = (() => {

    let employees = [...employeeData];

    return {

        getAll() {
            return [...employees];
        },

        getById(id) {
            return employees.find(emp => emp.id === Number(id));
        },

        add(employee) {
            employees.push(employee);
        },

        update(id, updatedData) {
            const index = employees.findIndex(emp => emp.id === Number(id));

            if (index === -1) {
                console.error("Employee not found");
                return null;
            }

            employees[index] = {
                ...employees[index],
                ...updatedData,
                id: employees[index].id
            };

            // Optional: persist data
            localStorage.setItem("employees", JSON.stringify(employees));

            return employees[index];
        },

        remove(id) {
            employees = employees.filter(emp => emp.id !== Number(id));
        },

        nextId() {
            if (employees.length === 0) return 1;

            return Math.max(...employees.map(emp => emp.id)) + 1;
        }

    };

})();