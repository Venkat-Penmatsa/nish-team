import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewcontractService {

  private baseUrl = 'http://localhost:8091';

  constructor(private http: HttpClient) { }

  listAllContracts(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/contract/listContracts`, { headers })
  }

}
