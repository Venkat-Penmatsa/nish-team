import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  createNewUser(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/user/createUser', assetJson, { headers })
  }


  fetchUsersList(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/user/listUsers' , { headers })
  }

  
}
