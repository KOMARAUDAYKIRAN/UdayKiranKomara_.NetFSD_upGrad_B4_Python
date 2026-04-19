using EMS.API.DTOs;
using EMS.API.Models;
using EMS.API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EMS.API.Services;

public class EmployeeService
{
    private readonly IEmployeeRepository _repo;

    public EmployeeService(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<PagedResult<EmployeeResponseDto>> GetAllAsync(EmployeeQueryParams query)
    {
        var q = _repo.GetQueryable();

        // SEARCH
        if (!string.IsNullOrEmpty(query.Search))
        {
            var term = query.Search.ToLower();
            q = q.Where(e =>
                (e.FirstName + " " + e.LastName).ToLower().Contains(term) ||
                e.Email.ToLower().Contains(term));
        }

        // FILTER
        if (!string.IsNullOrEmpty(query.Department))
            q = q.Where(e => e.Department == query.Department);

        if (!string.IsNullOrEmpty(query.Status))
            q = q.Where(e => e.Status == query.Status);

        // SORT
        q = query.SortBy switch
        {
            "salary" => query.SortDir == "asc"
                ? q.OrderBy(e => e.Salary)
                : q.OrderByDescending(e => e.Salary),

            "joinDate" => query.SortDir == "asc"
                ? q.OrderBy(e => e.JoinDate)
                : q.OrderByDescending(e => e.JoinDate),

            _ => query.SortDir == "asc"
                ? q.OrderBy(e => e.LastName).ThenBy(e => e.FirstName)
                : q.OrderByDescending(e => e.LastName).ThenByDescending(e => e.FirstName)
        };

        var total = await q.CountAsync();

        var data = await q
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(e => new EmployeeResponseDto
            {
                Id = e.Id,
                FullName = e.FirstName + " " + e.LastName,
                Email = e.Email,
                Department = e.Department,
                Designation = e.Designation,
                Salary = e.Salary,
                JoinDate = e.JoinDate,
                Status = e.Status
            })
            .ToListAsync();

        return new PagedResult<EmployeeResponseDto>
        {
            Data = data,
            TotalCount = total,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalPages = (int)Math.Ceiling(total / (double)query.PageSize),
            HasNextPage = query.Page * query.PageSize < total,
            HasPrevPage = query.Page > 1
        };
    }

    public async Task<EmployeeResponseDto?> GetByIdAsync(int id)
    {
        var e = await _repo.GetByIdAsync(id);
        if (e == null) return null;

        return new EmployeeResponseDto
        {
            Id = e.Id,
            FullName = e.FirstName + " " + e.LastName,
            Email = e.Email,
            Department = e.Department,
            Designation = e.Designation,
            Salary = e.Salary,
            JoinDate = e.JoinDate,
            Status = e.Status
        };
    }

    public async Task<bool> CreateAsync(EmployeeRequestDto dto)
    {
        if (await _repo.EmailExistsAsync(dto.Email))
            return false;

        var emp = new Employee
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Phone = dto.Phone,
            Department = dto.Department,
            Designation = dto.Designation,
            Salary = dto.Salary,
            JoinDate = dto.JoinDate,
            Status = dto.Status
        };

        await _repo.AddAsync(emp);
        return true;
    }

    public async Task<bool> UpdateAsync(int id, EmployeeRequestDto dto)
    {
        var emp = await _repo.GetByIdAsync(id);
        if (emp == null) return false;

        if (await _repo.EmailExistsAsync(dto.Email, id))
            return false;

        emp.FirstName = dto.FirstName;
        emp.LastName = dto.LastName;
        emp.Email = dto.Email;
        emp.Phone = dto.Phone;
        emp.Department = dto.Department;
        emp.Designation = dto.Designation;
        emp.Salary = dto.Salary;
        emp.JoinDate = dto.JoinDate;
        emp.Status = dto.Status;
        emp.UpdatedAt = DateTime.UtcNow;

        await _repo.UpdateAsync(emp);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var emp = await _repo.GetByIdAsync(id);
        if (emp == null) return false;

        await _repo.DeleteAsync(emp);
        return true;
    }
}