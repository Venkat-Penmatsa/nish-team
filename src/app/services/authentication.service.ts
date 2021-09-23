import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  public login(username, password): any {
    localStorage.setItem('currentUser', JSON.stringify(username));
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username+":"+password)});
    this.currentUserSubject.next(username);
    return this.httpClient.get("http://localhost:8091/login/authentication", {headers});
  }
}
