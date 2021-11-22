import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor(private http: HttpClient) {

  }

  fetchEmpLeaves(empId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/leaves/empLeavesBalence/' + empId, { headers })
  }

  fetchAllEmpLeaves(reportDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/leaves/allAppliedLeaves/'+reportDate, { headers })
  }

  updateEmpLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/leaves/updateEmpLeaves', assetJson, { headers })
  }

  calculateLeaves(startDate: any, endDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/leaves/calculateLeaves/'+startDate+'/'+endDate,  { headers })
  }

  applyLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/leaves/applyEmpLeave/', assetJson, { headers })
  }

  fetchAllEmpLeavesMonthlyReport(date:any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/timesheet/monthly/'+date, { headers })
  }

  fetchYearBatchJobStatus(date:any, jobName: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/batchJob/batchStatus/'+date+'/'+jobName, { headers })
  }

  fetchBatchJobs(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/batchJob/fetchBatches/', { headers })
  }

  triggerRTTLeaves(date:any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/leaves/calculateRTTLeaves/'+date+'/'+user, { headers })
  }

  triggerSOYLeaves(date:any, user: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/leaves/leavesSOYearJob/'+date+'/'+user, { headers })
  }

}
