const dashboardService = require('../js/dashboardService');

test('summary returns correct structure', () => {
    const summary = dashboardService.getSummary();

    expect(summary).toHaveProperty('total');
    expect(summary).toHaveProperty('active');
    expect(summary).toHaveProperty('inactive');
    expect(summary).toHaveProperty('departments');
});

test('recent employees returns array', () => {
    const recent = dashboardService.getRecentEmployees(5);
    expect(Array.isArray(recent)).toBe(true);
});