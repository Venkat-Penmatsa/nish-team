import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  private baseUrl = 'http://localhost:8091';

  constructor(private router: Router, private httpClient: HttpClient, private hostNameServiceService: HostNameServiceService) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.baseUrl = hostNameServiceService.getHostname();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  public login(username, password): any {
    console.log('baseUrl .......... '+this.baseUrl);
    localStorage.setItem('currentUser', JSON.stringify(username));
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ":" + password) });
    this.currentUserSubject.next(username);
    return this.httpClient.get(`${this.baseUrl}/login/authentication`, { headers });
    //return this.httpClient.get(this.hostNameServiceService.getHostname() +"http://localhost:8091/login/authentication", {headers});
  }
}
