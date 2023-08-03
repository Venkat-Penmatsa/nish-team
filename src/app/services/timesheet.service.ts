import { DOCUMENT } from '@angular/common';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private baseUrl = '';
  selectedDate = new Date();

  constructor(
    private http: HttpClient,
    private hostNameServiceService: HostNameServiceService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  fetchActiveContract(body: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post<any>(
      `${this.baseUrl}/timesheet/listContracts`,
      body,
      { headers }
    );
  }

  fetchTimeSheet(empId: any, date: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(
      `${this.baseUrl}/timesheet/fillTimeSheet/` + empId + '/' + date,
      { headers }
    );
  }

  updateTimeSheet(body: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post<any>(
      `${this.baseUrl}/timesheet/updateTimeSheet`,
      body,
      { headers }
    );
  }

  uploadMultiple(formData: any): Observable<any> {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/timesheet/uploadTimeSheet`,
      formData
    );

    return this.http.request(req);
  }

  download(filename: any, empId: any, date: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/timesheet/download/${filename}/${empId}/${date}`,
      { responseType: 'blob' }
    );
  }
}
