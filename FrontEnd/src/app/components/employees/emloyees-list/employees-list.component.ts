import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../model/employee.model";
import {EmployeesService} from "../../../services/employees.service";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit{
  listEmployee: Employee[] = [];
  constructor(private employeeService: EmployeesService) {
  }
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
        next: data => {
          this.listEmployee = data;
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
    });

    // this.listEmployee = [
    //   {
    //     id:"sadasdasdasd",
    //     name: 'Nguyen Van A',
    //     email: 'sdfasdf',
    //     phone: "123123",
    //     salary: 123123,
    //     department: 'sdfasdf'
    //   },
    //   {
    //     id:"sadasdasdasd",
    //     name: 'Nguyen Van B',
    //     email: 'sdfasdf',
    //     phone: "123123",
    //     salary: 123123,
    //     department: 'sdfasdf'
    //   }
    // ];
  }

}
