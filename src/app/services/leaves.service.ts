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

  fetchEmpLeavesHist(empId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    //return this.http.get<any>(`${this.baseUrl}/leaves/holidaysList` );
    return this.http.get<any>(this.PATH + '/leaves/fetchLeavesHistory/' + empId);

  }

}
