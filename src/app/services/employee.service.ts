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
}
