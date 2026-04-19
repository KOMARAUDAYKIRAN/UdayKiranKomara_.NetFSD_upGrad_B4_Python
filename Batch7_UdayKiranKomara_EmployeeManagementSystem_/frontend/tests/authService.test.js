const { authService } = require('../src/authService');

test('login works with correct credentials', () => {
    expect(authService.login('admin', 'admin123')).toBe(true);
});

test('login fails with wrong credentials', () => {
    expect(authService.login('wrong', '123')).toBe(false);
});

test('signup creates new admin', () => {
    expect(authService.signup('newAdmin', 'pass123')).toBe(true);
});