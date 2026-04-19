const employeeService = require('../js/employeeService');

test('add employee increases count', () => {
    const initial = employeeService.getAll().length;

    employeeService.add({
        firstName: "Test",
        lastName: "User",
        email: "test@test.com",
        phone: "9999999999",
        department: "Engineering",
        designation: "Tester",
        salary: 500000,
        joinDate: "2024-01-01",
        status: "Active"
    });

    expect(employeeService.getAll().length).toBe(initial + 1);
});

test('remove employee decreases count', () => {
    const all = employeeService.getAll();
    const id = all[0].id;

    employeeService.remove(id);

    expect(employeeService.getAll().length).toBe(all.length - 1);
});

test('search filter works', () => {
    const result = employeeService.applyFilters('priya', '', '');
    expect(result.length).toBeGreaterThan(0);
});