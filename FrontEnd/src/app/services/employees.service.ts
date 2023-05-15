import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Employee} from "../model/employee.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  apiUrl: string = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiUrl + '/api/Employees');
  }

  addEmployee(employee: Employee): Observable<Employee> {
    employee.id = '00000000-0000-0000-0000-000000000000';//empty guid
    return this.httpClient.post<Employee>(this.apiUrl + '/api/Employees', employee);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiUrl + '/api/Employees/' + id);
  }

  updateEmployee(editEmployeeReq: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(this.apiUrl + '/api/Employees/' + editEmployeeReq.id, editEmployeeReq);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.httpClient.delete<Employee>(this.apiUrl + '/api/Employees/' + id);
  }
}
