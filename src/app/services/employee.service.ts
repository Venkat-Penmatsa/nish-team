import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/admin-services";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService,@Inject(DOCUMENT) private document: Document) {
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
