using EMS.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EMS.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<AppUser> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique constraints
        modelBuilder.Entity<Employee>()
            .HasIndex(e => e.Email)
            .IsUnique();

        modelBuilder.Entity<AppUser>()
            .HasIndex(u => u.Username)
            .IsUnique();

        // Seed USERS (Admin + Viewer)
        modelBuilder.Entity<AppUser>().HasData(
            new AppUser
            {
                Id = 1,
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = "Admin"
            },
            new AppUser
            {
                Id = 2,
                Username = "viewer",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("viewer123"),
                Role = "Viewer"
            }
        );

        //  Seed EMPLOYEES (15 records)
        modelBuilder.Entity<Employee>().HasData(
      new Employee { Id = 1, FirstName = "Uday", LastName = "Kiran", Email = "uday@gmail.com", Department = "IT", Salary = 50000 },
      new Employee { Id = 2, FirstName = "Kalyani", LastName = "Rao", Email = "kalyani@gmail.com", Department = "HR", Salary = 45000 },
      new Employee { Id = 3, FirstName = "Ravi", LastName = "Kumar", Email = "ravi@gmail.com", Department = "IT", Salary = 55000 },
      new Employee { Id = 4, FirstName = "Sita", LastName = "Devi", Email = "sita@gmail.com", Department = "Finance", Salary = 60000 },
      new Employee { Id = 5, FirstName = "Arjun", LastName = "Reddy", Email = "arjun@gmail.com", Department = "IT", Salary = 52000 },
      new Employee { Id = 6, FirstName = "Priya", LastName = "Sharma", Email = "priya@gmail.com", Department = "HR", Salary = 48000 },
      new Employee { Id = 7, FirstName = "Kiran", LastName = "Varma", Email = "kiran@gmail.com", Department = "Finance", Salary = 62000 },
      new Employee { Id = 8, FirstName = "Meena", LastName = "Iyer", Email = "meena@gmail.com", Department = "IT", Salary = 53000 },
      new Employee { Id = 9, FirstName = "Rahul", LastName = "Das", Email = "rahul@gmail.com", Department = "HR", Salary = 47000 },
      new Employee { Id = 10, FirstName = "Anjali", LastName = "Mehta", Email = "anjali@gmail.com", Department = "Finance", Salary = 61000 },
      new Employee { Id = 11, FirstName = "Vikram", LastName = "Singh", Email = "vikram@gmail.com", Department = "IT", Salary = 58000 },
      new Employee { Id = 12, FirstName = "Pooja", LastName = "Nair", Email = "pooja@gmail.com", Department = "HR", Salary = 46000 },
      new Employee { Id = 13, FirstName = "Deepak", LastName = "Yadav", Email = "deepak@gmail.com", Department = "Finance", Salary = 64000 },
      new Employee { Id = 14, FirstName = "Sneha", LastName = "Patel", Email = "sneha@gmail.com", Department = "IT", Salary = 51000 },
      new Employee { Id = 15, FirstName = "Ajay", LastName = "Gupta", Email = "ajay@gmail.com", Department = "HR", Salary = 49000 }
  );
    }
}