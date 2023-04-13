import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HostNameServiceService } from './host-name-service.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/emp-services";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService, 
    @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }
  
  requestHeader = new HttpHeaders({
    "No-Auth":"True"
  });


  public login(loginDate:any){
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginDate,{headers: this.requestHeader});
    //return this.http.post(this.PATH + '/authenticate',loginDate,{headers: this.requestHeader});
  }

  updateUser(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/user/updateUser`, assetJson, { headers })
  }


}
