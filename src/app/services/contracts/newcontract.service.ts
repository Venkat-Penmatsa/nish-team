import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";
import { HostNameServiceService } from '../host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class NewcontractService {

  private baseUrl = 'https://3.125.8.211:8443/admin-services';

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService) {
    this.baseUrl = hostNameServiceService.getHostname();
  }


  createContract(body: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/contract/newContract`, body, { headers })
  }

  listAllContracts(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/contract/listContracts`, { headers })
  }

  fetchContractInfo(contractId: string) {
    return this.http.get(`${this.baseUrl}/contract/fetchContractInfo/` + contractId).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }

}
