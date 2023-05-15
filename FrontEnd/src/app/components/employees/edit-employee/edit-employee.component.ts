import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "../../../services/employees.service";
import {Employee} from "../../../model/employee.model";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit{
  editEmployeeReq: Employee = {
    id: '',
    name: '',
    email: '',
    phone: '',
    salary: 0,
    department: ''
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          //call api get employee by id
          console.log(id);
          this.employeeService.getEmployeeById(id).subscribe({
            next: (response) => {
              console.log(response);
              this.editEmployeeReq = response;
            }
          });
        }
      }
    })
  }
  editEmployee() {
    //executes when the form is submitted
    this.employeeService.updateEmployee(this.editEmployeeReq).subscribe( {
      next: (response) => {
        console.log(response);
        alert('Employee edit successfully');
        //redirect to employees list
        this.router.navigate(['employees']);
      },
      error: (error) => {
        console.log(error);
        alert('An error occurred while adding employee');
      }
    });
  }

  deleteEmployee(id:string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        console.log(response);
        alert('Employee delete successfully');
        //redirect to employees list
        this.router.navigate(['employees']);
      }
    });
  }
}
