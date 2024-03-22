import { DOCUMENT } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NotFoundError, Observable, catchError, throwError } from 'rxjs';
import { Employee } from '../model/Employee';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl =
    'https://' +
    this.document.location.hostname +
    ':' +
    this.document.location.port +
    '/admin-services';

  constructor(
    private http: HttpClient,
    private hostNameServiceService: HostNameServiceService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  fetchEmployeeById(employee: String): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(
      `${this.baseUrl}/employee/getEmployeeById/` + employee,
      { headers }
    );
  }

  createEmployee(employee: Employee): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post<any>(
      `${this.baseUrl}/employee/createEmployee`,
      employee,
      { headers }
    );
  }

  fetchAllEmployeeName(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/fetchAllEmployeeName`);
  }

  fetchActiveEmployeeName(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/fetchActiveEmployees`);
  }

  fetchAllEmpLeaves(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/leaves/allEmpleavesBalence`, {
      headers,
    });
  }

  listAllEmployeeName(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/employee/listEmployees`, { headers });
  }

  downloadActiveEmp(): Observable<any> {
    //const headers = { 'Content-type': 'application/json' };
    return this.http
      .get(`${this.baseUrl}/employee/downloadActiveEmployees/`, {
        responseType: 'blob',
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    //return Observable.throw(error.message || "server error.");
    return throwError(new NotFoundError(error.message || 'server error.'));
  }
}
