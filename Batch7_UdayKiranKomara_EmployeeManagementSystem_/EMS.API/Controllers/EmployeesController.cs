using EMS.API.DTOs;
using EMS.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EMS.API.Controllers;

[ApiController]
[Route("api/employees")]
[Authorize] // All endpoints require login
public class EmployeesController : ControllerBase
{
    private readonly EmployeeService _service;

    public EmployeesController(EmployeeService service)
    {
        _service = service;
    }

    // GET ALL (Pagination + Filter + Search + Sort)
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] EmployeeQueryParams query)
    {
        var result = await _service.GetAllAsync(query);
        return Ok(result);
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var emp = await _service.GetByIdAsync(id);

        if (emp == null)
            return NotFound();

        return Ok(emp);
    }

    // CREATE (Admin Only)
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(EmployeeRequestDto dto)
    {
        var success = await _service.CreateAsync(dto);

        if (!success)
            return Conflict(new { message = "Email already exists" });

        return Ok(new { message = "Employee created successfully" });
    }

    // UPDATE (Admin Only)
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, EmployeeRequestDto dto)
    {
        var success = await _service.UpdateAsync(id, dto);

        if (!success)
            return NotFound(new { message = "Employee not found or email conflict" });

        return Ok(new { message = "Employee updated successfully" });
    }

    // DELETE (Admin Only)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);

        if (!success)
            return NotFound();

        return Ok(new { message = "Employee deleted successfully" });
    }

    // DASHBOARD API 
    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var data = await BuildDashboardAsync();
        return Ok(data);
    }

    // PRIVATE DASHBOARD LOGIC
    private async Task<DashboardDto> BuildDashboardAsync()
    {
        var all = await _service.GetAllAsync(new EmployeeQueryParams { Page = 1, PageSize = 1000 });

        var employees = all.Data;

        return new DashboardDto
        {
            Total = all.TotalCount,
            Active = employees.Count(e => e.Status == "Active"),
            Inactive = employees.Count(e => e.Status == "Inactive"),
            Departments = employees.Select(e => e.Department).Distinct().Count(),

            DepartmentBreakdown = employees
                .GroupBy(e => e.Department)
                .ToDictionary(g => g.Key, g => g.Count()),

            RecentEmployees = employees
                .OrderByDescending(e => e.Id)
                .Take(5)
                .ToList()
        };
    }
}