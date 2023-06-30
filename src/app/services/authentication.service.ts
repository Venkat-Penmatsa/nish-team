import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostNameServiceService } from './host-name-service.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  private baseUrl =
    'https://' +
    this.document.location.hostname +
    ':' +
    this.document.location.port +
    '/admin-services';

  constructor(
    private httpClient: HttpClient,
    private hostNameServiceService: HostNameServiceService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.baseUrl = hostNameServiceService.getHostname();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  public login(username: any, password: any): any {
    console.log('baseUrl .......... ' + this.baseUrl);
    localStorage.setItem('currentUser', JSON.stringify(username));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    this.currentUserSubject.next(username);
    return this.httpClient.get(`${this.baseUrl}/login/authentication`, {
      headers,
    });
  }
}
