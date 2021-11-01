import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http: HttpClient) {
  }

  fetchEmployeeExpenses(employeeNo: string) {
    return this.http.get("http://localhost:8091/finance/getEmpExpenses/"+employeeNo).pipe(catchError(this.errorHandler));
  }

  updateEmployeeExpenses(empExpenses: any) {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post("http://localhost:8091/finance/empExpenses/", empExpenses, { headers }).pipe(catchError(this.errorHandler));
  }

  fetchMonthlyTimesheet(employeeNo: string, month: any) {
    const url = '../assets/json/monthly_' + employeeNo + '.json';
    return this.http.get("http://localhost:8091/timesheet/monthly/"+employeeNo+"/"+month).pipe(catchError(this.errorHandler));
  }

  fetchYearlyTimesheet(employeeNo: string, year: string) {
    const url = '../assets/json/yearly_' + employeeNo + '.json';
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  generateEmpRevenueReport(employeeNo: string, year: string) {
    return this.http.get("http://localhost:8091/finance/generateEmpRevenueReport/"+employeeNo+"/"+year).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }
}
