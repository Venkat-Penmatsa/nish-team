import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseUrl = 'https://3.125.8.211:8443/admin-services';

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService,@Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  createNewUser(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/user/createUser`, assetJson, { headers })
  }

  updateUser(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/user/updateUser`, assetJson, { headers })
  }


  fetchUsersList(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/user/listUsers`, { headers })
  }


}
