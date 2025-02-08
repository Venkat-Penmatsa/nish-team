import { DOCUMENT } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NotFoundError, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
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

  fetchEmployeeExpenses(employeeNo: string, year: string) {
    return this.http
      .get(`${this.baseUrl}/finance/getEmpExpenses/` + employeeNo + '/' + year)
      .pipe(catchError(this.errorHandler));
  }

  updateEmployeeExpenses(empExpenses: any) {
    const headers = { 'Content-type': 'application/json' };
    return this.http
      .post(`${this.baseUrl}/finance/empExpenses/`, empExpenses, { headers })
      .pipe(catchError(this.errorHandler));
  }

  fetchMonthlyTimesheet(employeeNo: string, month: any) {
    const url = '../assets/json/monthly_' + employeeNo + '.json';
    return this.http
      .get(`${this.baseUrl}/timesheet/monthly/` + employeeNo + '/' + month)
      .pipe(catchError(this.errorHandler));
  }

  fetchYearlyTimesheet(employeeNo: string, year: string) {
    // const url = '../assets/json/yearly_' + employeeNo + '.json';
    // return this.http.get(url).pipe(catchError(this.errorHandler));
    const headers = { 'Content-type': 'application/json' };
    return this.http
      .get(`${this.baseUrl}/timesheet/yearly/` + employeeNo + '/' + year, {
        headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  downloadYearlyTimesheet(employeeNo: string, year: any) {
    const headers = { 'Content-type': 'application/pdf' };
    return this.http
      .get(
        `${this.baseUrl}/timesheet/downloadEmpYearlyReport/` +
          employeeNo +
          '/' +
          year,
        { responseType: 'blob' }
      )
      .pipe(catchError(this.errorHandler));
  }

  generateEmpRevenueReport(employeeNo: string, year: string) {
    return this.http
      .get(
        `${this.baseUrl}/finance/generateEmpRevenueReport/` +
          employeeNo +
          '/' +
          year
      )
      .pipe(catchError(this.errorHandler));
  }

  generateYearlyRevenueReport(year: string) {
    return this.http
      .get(`${this.baseUrl}/finance/yearlyRevenueReport/` + year)
      .pipe(catchError(this.errorHandler));
  }

  downloadMonthlyTimeSheet(date: any): Observable<any> {
    //const headers = { 'Content-type': 'application/json' };
    return this.http
      .get(`${this.baseUrl}/timesheet/downloadMonthlyTimeSheet/` + date, {
        responseType: 'blob',
      })
      .pipe(catchError(this.errorHandler));
  }

  fetchTimeSheet(empId: any, date: any): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/timesheet/fillTimeSheet/` + empId + '/' + date)
      .pipe(catchError(this.errorHandler));
  }

  updateTimeSheet(body: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http
      .post(`${this.baseUrl}/timesheet/updateTimeSheet/`, body, { headers })
      .pipe(catchError(this.errorHandler));
  }

  updateTSInvoiceFlag(body: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http
      .post(`${this.baseUrl}/timesheet/updateTSInvoiceFlag`, body, { headers })
      .pipe(catchError(this.errorHandler));
  }

  fetchAllEmpTimeSheet(date: any): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/timesheet/fetchAllEmpTimeSheet/` + date)
      .pipe(catchError(this.errorHandler));
  }

  generateContractBasedTimeSheetReport(date: any): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/timesheet/generateContractTimeSheet/` + date)
      .pipe(catchError(this.errorHandler));
  }

  generateOldContractBasedTimeSheetReport(date: any): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/timesheet/generateOldContractBasedTimeSheetReport/` +
          date
      )
      .pipe(catchError(this.errorHandler));
  }

  downloadInvoice(nishContractId: any, empId: any, date: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/invoice/download/invoice/${nishContractId}/${empId}/${date}`,
      { responseType: 'blob' }
    );
  }

  downloadCreditNote(
    nishContractId: any,
    empId: any,
    date: any
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/invoice/download/creditNote/${nishContractId}/${empId}/${date}`,
      { responseType: 'blob' }
    );
  }
  download(filename: any, empId: any, date: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/timesheet/download/${filename}/${empId}/${date}`,
      { responseType: 'blob' }
    );
  }

  delete(filename: any, empId: any, date: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/timesheet/delete/${filename}/${empId}/${date}`
    );
  }

  upload(formData: any): Observable<any> {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/timesheet/uploadTimeSheet`,
      formData
    );

    return this.http.request(req);
  }

  errorHandler(error: HttpErrorResponse) {
    //return Observable.throw(error.message || "server error.");
    return throwError(new NotFoundError(error.message || 'server error.'));
  }
}
