import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH = 'http://localhost:8888';
  requestHeader = new HttpHeaders({
    "No-Auth":"True"
  });

  constructor(private httpClient: HttpClient) { }

  public login(loginDate:any){
    return this.httpClient.post(this.PATH + '/authenticate',loginDate,{headers: this.requestHeader});
  }

}
