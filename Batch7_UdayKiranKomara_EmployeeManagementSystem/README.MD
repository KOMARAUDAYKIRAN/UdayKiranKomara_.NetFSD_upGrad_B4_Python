# Employee Management System

## Overview

The **Employee Management System** is a web-based application designed to efficiently manage employee records within an organization. It allows administrators to perform CRUD operations (Create, Read, Update, Delete) and provides dashboard insights for better decision-making.

---

## Objectives

* Manage employee data effectively
* Provide real-time dashboard insights
* Ensure proper data validation
* Enable searching, filtering, and sorting

---

## Features

*  Admin Signup & Login (with validation)
*  Add / Edit / Delete Employees
*  Dashboard (Total, Active, Inactive, Department-wise)
*  Search Employees (by name/email)
*  Filter (Department & Status)
*  Sorting (Name & Salary)
*  Admin Profile Management
*  Responsive UI
*  Unit Testing using Jest

---

## Tech Stack

* **Frontend:** HTML, CSS, Bootstrap
* **Scripting:** JavaScript, jQuery
* **Testing:** Jest

---

## Project Structure

```
employee-management-dashboard/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── data.js
│   ├── storageService.js
│   ├── authService.js
│   ├── employeeService.js
│   ├── validationService.js
│   ├── dashboardService.js
│   ├── uiService.js
│   └── app.js
│
├── tests/
│   ├── employeeService.test.js
│   ├── authService.test.js
│   └── dashboardService.test.js
│
├── package.json
└── jest.config.js
```

---

## System Architecture

The project follows a **modular architecture**:

* **authService** → Handles authentication
* **employeeService** → Manages employee CRUD operations
* **dashboardService** → Generates dashboard insights
* **storageService** → Handles local storage
* **validationService** → Validates user input
* **uiService** → Updates UI dynamically

---

## Functional Modules

### 1. Admin Authentication

* Secure signup & login
* Validation for credentials

### 2. Employee Management

* Add new employees
* Edit existing records
* Delete with confirmation
* View detailed information

### 3. Dashboard

* Total employees
* Active vs Inactive
* Department distribution

### 4. Search & Filters

* Search by name/email
* Filter by department
* Filter by status

### 5. Sorting

* Name (A–Z / Z–A)
* Salary (Low–High / High–Low)

---

## Testing

Implemented unit testing using **Jest**:

* Login validation
* Signup validation
* Employee operations
* Sorting & filtering

---

## How to Run

1. Clone the repository

```bash
git clone <your-repo-link>
```

2. Navigate to project folder

```bash
cd employee-management-dashboard
```

3. Install dependencies

```bash
npm install
```

4. Run tests

```bash
npm test
```

5. Open `index.html` in browser

---

## Future Enhancements

* Backend integration (Node.js / Database)
* Graphical dashboard (charts)
* Export data to Excel
* Role-based authentication

---

## Author

**K. Uday Kiran**

---

