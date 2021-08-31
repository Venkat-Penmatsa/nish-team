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

  fetchMonthlyTimesheet(employeeNo: string, month: string) {
    const url = '../assets/json/monthly_' + employeeNo + '.json';
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  fetchYearlyTimesheet(employeeNo: string, year: string) {
    const url = '../assets/json/yearly_' + employeeNo + '.json';
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }
}
