import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from "rxjs/operators";

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

  fetchContractInfo(contractId: string) {
    return this.http.get(`${this.baseUrl}/contract/fetchContractInfo/`+contractId).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }

}
