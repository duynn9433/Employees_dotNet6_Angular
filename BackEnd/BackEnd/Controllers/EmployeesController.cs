using BackEnd.Data;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly MyDbContext myDbContext;

        public EmployeesController(MyDbContext myDbContext)
        {
            this.myDbContext = myDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployee()
        {
            //return View();
            var employees = await myDbContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            employee.Id = Guid.NewGuid();
            //return View();
            try
            {
                await myDbContext.Employees.AddAsync(employee);
                await myDbContext.SaveChangesAsync();

                return Ok(employee);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
        {
            var employee = await myDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee updateEmployee)
        {
            var employee = await myDbContext.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound(employee);
            }
            employee.Name = updateEmployee.Name;
            employee.Email = updateEmployee.Email;
            employee.Phone = updateEmployee.Phone;
            employee.Salary = updateEmployee.Salary;
            employee.Department = updateEmployee.Department;

            await myDbContext.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await myDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound(employee);
            }

            myDbContext.Remove(employee);
            await myDbContext.SaveChangesAsync();
            return Ok(employee);
        }
    }
}
