import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeesListComponent} from "./components/employees/emloyees-list/employees-list.component";
import {AddEmployeeComponent} from "./components/employees/add-employee/add-employee.component";
import {EditEmployeeComponent} from "./components/employees/edit-employee/edit-employee.component";

const routes: Routes = [
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/edit/:id', component: EditEmployeeComponent },
  { path: '', component: EmployeesListComponent }
  // { path: '', redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
