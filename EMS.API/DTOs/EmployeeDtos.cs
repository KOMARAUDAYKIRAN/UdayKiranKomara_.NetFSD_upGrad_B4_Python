namespace EMS.API.DTOs;

public class EmployeeRequestDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public decimal Salary { get; set; }
    public DateTime JoinDate { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class EmployeeResponseDto
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;

    public decimal Salary { get; set; }

    public DateTime JoinDate { get; set; }

    public string Status { get; set; } = string.Empty;
}

public class EmployeeQueryParams
{
    public string? Search { get; set; }
    public string? Department { get; set; }
    public string? Status { get; set; }

    public string SortBy { get; set; } = "name";
    public string SortDir { get; set; } = "asc";

    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class PagedResult<T>
{
    public List<T> Data { get; set; } = new();

    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }

    public bool HasNextPage { get; set; }
    public bool HasPrevPage { get; set; }
}

public class DashboardDto
{
    public int Total { get; set; }
    public int Active { get; set; }
    public int Inactive { get; set; }
    public int Departments { get; set; }

    public Dictionary<string, int> DepartmentBreakdown { get; set; } = new();

    public List<EmployeeResponseDto> RecentEmployees { get; set; } = new();
}