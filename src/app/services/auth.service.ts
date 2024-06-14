import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeout;
  tokenSubscription = new Subscription();
  constructor(private router: Router) {}

  public setUser(user: any) {
    localStorage.setItem('user', user);
  }

  public getUser() {
    return localStorage.getItem('user');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    const token = localStorage.getItem('jwtToken');
    const helper = new JwtHelperService();

    // Other functions
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);
    this.timeout =
      helper.getTokenExpirationDate(token)?.valueOf() - new Date().valueOf();
    this.expirationCounter(this.timeout);

    return token;
  }

  public expirationCounter(timeout) {
    // this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null)
      .pipe(delay(timeout))
      .subscribe(() => {
        console.log('EXPIRED!!');
        this.logout();
      });
  }

  public isTokenExpired() {
    const token = localStorage.getItem('jwtToken');
    const helper = new JwtHelperService();

    return helper.isTokenExpired(token);
  }

  public logout() {
    this.tokenSubscription.unsubscribe();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public isLoggedIn() {
    return this.getToken();
  }
}
