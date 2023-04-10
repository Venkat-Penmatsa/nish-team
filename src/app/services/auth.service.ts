import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setUser(user : any){
    localStorage.setItem("user",user);
  }

  public getUser() {
    return localStorage.getItem("user");
  }

  public setToken(jwtToken : string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken() {
    return localStorage.getItem("jwtToken");
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getToken();
  }

}
