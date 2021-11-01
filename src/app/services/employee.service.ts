import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8091';

  constructor(private http: HttpClient) { }


  fetchAllEmployeeName(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/fetchAllEmployeeName`);
  }


  fetchAllEmpLeaves(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/leaves/allEmpleavesBalence', { headers })
  }

  listAllEmployeeName(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/employee/listEmployees`, { headers })
  }

}
