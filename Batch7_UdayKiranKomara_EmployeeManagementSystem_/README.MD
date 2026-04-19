# Employee Management System – Mini Project 2

##  EMPLOYEE Details
- **Name:** [Your Name]
- **Batch:** [Your Batch No]
- **Project:** Employee Management System (Full Stack)

---

#  Project Overview
This is a **Full Stack Employee Management System** built using .NET 8 Web API and a modern frontend.

In Mini Project 1, data was stored in memory.  
In this project, it is upgraded to use a **real SQL Server database with authentication and role-based access**.

---

#  Tech Stack

##  Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- jQuery

## Backend
- .NET 8 Web API
- Entity Framework Core (Code First)
- SQL Server 2022

##  Security
- JWT Authentication
- BCrypt Password Hashing

---

#  Features

##  Authentication
- Register & Login
- Password hashing using BCrypt
- JWT Token-based authentication

## Role-Based Access
- **Admin**
  - Add Employee
  - Edit Employee
  - Delete Employee
- **Viewer**
  - View employees only (read-only)

---

##  Employee Management
- Add Employee
- Edit Employee
- Delete Employee
- View Employee details

---

##  Advanced Features
- Search by Name & Email
- Filter by Department & Status
- Sort:
  - Name (A–Z / Z–A)
  - Salary
  - Join Date
- Pagination (Server-side)

---

##  Dashboard
- Total Employees
- Active / Inactive Employees
- Department Breakdown
- Recent Employees

---

# 📁 Project Structure
EMS-MiniProject2/
│
├── EMS.API/ # Backend
│ ├── Controllers/
│ ├── Services/
│ ├── Repositories/
│ ├── Models/
│ ├── DTOs/
│ ├── Data/
│ ├── Program.cs
│ └── appsettings.json
│
└── frontend/ # Frontend
├── index.html
├── css/
└── js/

---

#  Setup Instructions

##  Backend Setup

1. Open terminal in API folder:
cd EMS.API


2. Restore packages:

dotnet restore


3. Apply migrations:

dotnet ef database update


4. Run API:

dotnet run


 API URL:

http://localhost:5000


 Swagger:

http://localhost:5000/swagger


---

##  Frontend Setup

- Open `frontend/index.html`
- Use Live Server OR open in browser

---

#  Default Login Credentials

| Role   | Username | Password   |
|--------|----------|------------|
| Admin  | admin    | admin123   |
| Viewer | viewer   | viewer123  |

---

#  API Endpoints

##  Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`

##  Employees
- GET `/api/employees`
- GET `/api/employees/{id}`
- POST `/api/employees` (Admin)
- PUT `/api/employees/{id}` (Admin)
- DELETE `/api/employees/{id}` (Admin)
- GET `/api/employees/dashboard`

---

#  Security Implementation
- JWT token authentication
- Role-based authorization
- Passwords stored as BCrypt hash
- Authorization header used for API calls

---

#  Testing
- NUnit used for backend testing
- Moq used for mocking
- EF InMemory used for testing database operations

---

#  Important Notes
- Run database command before starting:

dotnet ef database update

- JWT token is stored in memory
- All filtering, sorting, pagination handled in backend

---

#  Learning Outcomes
- Full Stack Development
- REST API Design
- Entity Framework Core
- Authentication & Authorization
- Clean Architecture (Service + Repository Pattern)

---

# Final Status
✔ Fully Working Application  
✔ Admin & Viewer Roles Implemented  
✔ Database Connected  
✔ Ready for Submission

---

#  Thank You
