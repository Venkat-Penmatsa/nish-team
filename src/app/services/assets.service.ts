import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private baseUrl = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/emp-services";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService, 
    @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }


  fetchEmployeeAssets(employee: String): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(`${this.baseUrl}/assets/fetchAllAssets/` + employee);
    //return this.http.get<any>(this.PATH + '/assets/fetchAllAssets/'  + employee);
  }
}
