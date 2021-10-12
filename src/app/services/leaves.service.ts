import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor(private http: HttpClient) {

  }



  fetchEmpLeaves(empId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/leaves/empLeavesBalence/' + empId, { headers })
  }


  fetchAllEmpLeaves(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/leaves/allEmpleavesBalence', { headers })
  }

  updateEmpLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/leaves/updateEmpLeaves', assetJson, { headers })
  }

  calculateLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/leaves/calculateLeaves/', assetJson, { headers })
  }

  applyLeaves(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/leaves/applyEmpLeave/', assetJson, { headers })
  }

}
