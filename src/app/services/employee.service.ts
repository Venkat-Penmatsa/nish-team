import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://3.125.8.211:8443/admin-services';

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService) {
    this.baseUrl = hostNameServiceService.getHostname();
  }


  fetchEmployeeById(employee: String): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(`${this.baseUrl}/employee/getEmployeeById/` + employee, { headers });

  }

  createEmployee(employee: Employee): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post<any>(`${this.baseUrl}/employee/createEmployee`, employee, { headers });

  }

  fetchAllEmployeeName(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/fetchAllEmployeeName`);
  }


  fetchAllEmpLeaves(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/leaves/allEmpleavesBalence`, { headers })
  }

  listAllEmployeeName(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/employee/listEmployees`, { headers })
  }

}
