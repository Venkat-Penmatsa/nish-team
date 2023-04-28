import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class MobilityService {

  private baseUrl = "";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService,
    @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  fetchEmpAllMonthsMobility(empId: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/mobility/fetchEmpAllMonthsMobility/` + empId, { headers })
  }

  fetchMobilityById(employee: String): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(`${this.baseUrl}/mobility/getMobilityDetails/` + employee, { headers });
  }
}
