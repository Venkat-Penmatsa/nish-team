import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

 //private baseUrl = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/admin-services";
 PATH = 'http://localhost:8888';
 constructor(private http: HttpClient) { }

 fetchActiveContract(body :any): Observable<any> {
   const headers = { 'Content-type': 'application/json' };
   //return this.http.get<any>(`${this.baseUrl}/timesheet/listContracts` );
   return this.http.post<any>(this.PATH + '/timesheet/listContracts', body ,{ headers });

 }
}
