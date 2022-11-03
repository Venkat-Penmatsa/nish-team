import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  //private baseUrl = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/admin-services";
  PATH = 'http://localhost:8888';
  constructor(private http: HttpClient) { }

  fetchEmployeeAssets(employee: String): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get<any>(this.PATH + '/assets/fetchAllAssets/'  + employee);
  }
}
