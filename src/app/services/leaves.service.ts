import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  private baseUrl = 'http://localhost:8091';

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService) {
    this.baseUrl = hostNameServiceService.getHostname();
  }


  fetchEmpLeaves(empId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/leaves/empLeavesBalence/` + empId, { headers })
  }

  fetchAllEmpLeaves(reportDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/leaves/allAppliedLeaves/` + reportDate, { headers })
  }

  updateEmpLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/leaves/updateEmpLeaves`, assetJson, { headers })
  }

  calculateLeaves(startDate: any, endDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/leaves/calculateLeaves/` + startDate + '/' + endDate, { headers })
  }

  applyLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/leaves/applyEmpLeave/`, assetJson, { headers })
  }

  fetchAllEmpLeavesMonthlyReport(date: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/timesheet/monthly/` + date, { headers })
  }

  fetchYearBatchJobStatus(date: any, jobName: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/batchJob/batchStatus/` + date + '/' + jobName, { headers })
  }

  fetchBatchJobs(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/batchJob/fetchBatches/`, { headers })
  }

  triggerRTTLeaves(date: any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/leaves/calculateRTTLeaves/` + date + '/' + user, { headers })
  }

  freezeTimeSheetJob(date: any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/batchJob/freezeTimeSheet/` + date + '/' + user, { headers })
  }

  triggerSOYLeaves(date: any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/leaves/leavesSOYearJob/` + date + '/' + user, { headers })
  }

}
