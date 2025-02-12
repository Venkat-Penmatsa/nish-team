import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NotFoundError, Observable, catchError, throwError } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root',
})
export class LeavesService {
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

  deleteLeave(leaveId: any) {
    const headers = { 'Content-type': 'application/json' };
    return this.http.delete(`${this.baseUrl}/leaves/deleteLeave/` + leaveId, {
      headers,
    });
  }

  fetchEmpLeaves(empId: string, year: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/leaves/empLeavesBalence/` + empId + '/' + year,
      { headers }
    );
  }

  fetchAllEmpLeaves(reportDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/leaves/allAppliedLeaves/` + reportDate,
      { headers }
    );
  }

  updateEmpLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/leaves/updateEmpLeaves`, assetJson, {
      headers,
    });
  }

  calculateLeaves(startDate: any, endDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/leaves/calculateLeaves/` + startDate + '/' + endDate,
      { headers }
    );
  }

  applyLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/leaves/applyEmpLeave/`, assetJson, {
      headers,
    });
  }

  fetchAllEmpLeavesMonthlyReport(date: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/timesheet/monthly/` + date, {
      headers,
    });
  }

  fetchYearBatchJobStatus(date: any, jobName: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/batchJob/batchStatus/` + date + '/' + jobName,
      { headers }
    );
  }

  fetchBatchJobs(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/batchJob/fetchBatches/`, { headers });
  }

  triggerRTTLeaves(date: any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/leaves/calculateRTTLeaves/` + date + '/' + user,
      { headers }
    );
  }

  freezeTimeSheetJob(date: any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/batchJob/freezeTimeSheet/` + date + '/' + user,
      { headers }
    );
  }

  freezeNEPtuneTSJob(date: any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/batchJob/freezeNEPtuneTS/` + date + '/' + user,
      { headers }
    );
  }

  triggerSOYLeaves(date: any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/leaves/leavesSOYearJob/` + date + '/' + user,
      { headers }
    );
  }

  unFreezeTimeSheet(date: any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(
      `${this.baseUrl}/batchJob/unFreezeTimeSheet/` + date + '/' + user,
      { headers }
    );
  }

  downloadSickLeavesReport(date: any): Observable<any> {
    //const headers = { 'Content-type': 'application/json' };
    return this.http
      .get(`${this.baseUrl}/leaves/generateSickLeavesReport/` + date, {
        responseType: 'blob',
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    //return Observable.throw(error.message || "server error.");
    return throwError(new NotFoundError(error.message || 'server error.'));
  }
}
