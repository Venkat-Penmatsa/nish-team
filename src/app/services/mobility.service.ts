import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class MobilityService {

  private baseUrl = "https://" + this.document.location.hostname + ':' + this.document.location.port + "/admin-services";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService, @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }


  getMobilityDetails(empId: any, selectedDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/mobility/getMobilityDetails/` + empId + '/' + selectedDate, { headers })
  }


  getMonthMobilityDetails(empId: any, selectedDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/mobility/selectedMonEmpMobility/` + empId + '/' + selectedDate, { headers })
  }


  fetchEmpAllMonthsMobility(empId: any, selectedDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/mobility/fetchEmpAllMonthsMobility/` + empId + '/' + selectedDate, { headers })
  }

  fetchMobilityReport(selectedDate: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/mobility/mobilityReport/`  + selectedDate, { headers })
  }

  applyMobility(applyMob: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/mobility/saveMobility/`, applyMob, { headers })
  }

  applyMonthMobility(applyMonthMob: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/mobility/saveMonthMobility/`, applyMonthMob, { headers })
  }

}
