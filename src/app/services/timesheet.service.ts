import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {


  private baseUrl = 'https://3.125.8.211:8443/admin-services';

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  fetchEmployeeExpenses(employeeNo: string) {
    return this.http.get(`${this.baseUrl}/finance/getEmpExpenses/` + employeeNo).pipe(catchError(this.errorHandler));
  }

  updateEmployeeExpenses(empExpenses: any) {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/finance/empExpenses/`, empExpenses, { headers }).pipe(catchError(this.errorHandler));
  }

  fetchMonthlyTimesheet(employeeNo: string, month: any) {
    const url = '../assets/json/monthly_' + employeeNo + '.json';
    return this.http.get(`${this.baseUrl}/timesheet/monthly/` + employeeNo + "/" + month).pipe(catchError(this.errorHandler));
  }

  fetchYearlyTimesheet(employeeNo: string, year: string) {
    // const url = '../assets/json/yearly_' + employeeNo + '.json';
    // return this.http.get(url).pipe(catchError(this.errorHandler));
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/timesheet/yearly/` + employeeNo + "/" + year, { headers }).pipe(catchError(this.errorHandler));
  }

  downloadYearlyTimesheet(employeeNo: string, year: any) {
    const headers = { 'Content-type': 'application/vnd.ms-excel' };
    return this.http.get(`${this.baseUrl}/timesheet/downloadYearlyReport/` + employeeNo + "/" + year, {responseType: 'blob'}).pipe(catchError(this.errorHandler));
  }

  generateEmpRevenueReport(employeeNo: string, year: string) {
    return this.http.get(`${this.baseUrl}/finance/generateEmpRevenueReport/` + employeeNo + "/" + year).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }
}
