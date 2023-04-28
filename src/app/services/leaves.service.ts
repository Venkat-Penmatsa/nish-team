import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  private baseUrl = "";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService, @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  fetchCompanyHolidays(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(`${this.baseUrl}/leaves/holidaysList`);
  }

  fetchEmpLeaves(empId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(`${this.baseUrl}/leaves/empLeavesBalence/` + empId);
  }

  calculateLeaves(startDate: any, endDate: any): Observable<any> {
    console.log(" startDate " + startDate);
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(`${this.baseUrl}/leaves/calculateLeaves/` + startDate + '/' + endDate, { headers });
  }

  fetchEmpLeavesHist(empId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(`${this.baseUrl}/leaves/fetchLeavesHistory/` + empId);
  }

  applyLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post<any>(`${this.baseUrl}/leaves/applyEmpLeave/`, assetJson, { headers })
  }

}
