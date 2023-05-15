//create object to binding data & inject, use service to get data
import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../model/employee.model";
import {EmployeesService} from "../../../services/employees.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  addEmployeeReq: Employee ={
    id: '',
    name:'',
    email:'',
    phone:'',
    salary:0,
    department:'',
  }
  constructor(
    private employeeService: EmployeesService,
    private router: Router
  ) {}
  ngOnInit(): void {
  }

  addEmployee() {
    //executes when the form is submitted
    this.employeeService.addEmployee(this.addEmployeeReq).subscribe( {
      next: (response) => {
        console.log(response);
        alert('Employee added successfully');
        //redirect to employees list
        this.router.navigateByUrl('/employees');
      },
      error: (error) => {
        console.log(error);
        alert('An error occurred while adding employee');
      }
    });
  }
}
