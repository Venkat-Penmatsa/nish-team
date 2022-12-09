import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  //private baseUrl = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/admin-services";
  PATH = 'http://localhost:8888';
  constructor(private http: HttpClient) { }

  fetchCompanyHolidays(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    //return this.http.get<any>(`${this.baseUrl}/leaves/holidaysList` );
    return this.http.get<any>(this.PATH + '/leaves/holidaysList');

  }

  fetchEmpLeaves(empId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    //return this.http.get<any>(`${this.baseUrl}/leaves/holidaysList` );
    return this.http.get<any>(this.PATH + '/leaves/empLeavesBalence/' + empId);

  }

  calculateLeaves(startDate: any, endDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(this.PATH + "/leaves/calculateLeaves/" + startDate + '/' + endDate, { headers })
  }

  fetchEmpLeavesHist(empId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    //return this.http.get<any>(`${this.baseUrl}/leaves/holidaysList` );
    return this.http.get<any>(this.PATH + '/leaves/fetchLeavesHistory/' + empId);

  }

  applyLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(this.PATH + '/leaves/applyEmpLeave/', assetJson, { headers })
  }

}
