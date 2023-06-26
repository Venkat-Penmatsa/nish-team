import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NotFoundError, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root',
})
export class ClientDetailsService {
  private baseUrl =
    'https://' +
    this.document.location.hostname +
    ':' +
    this.document.location.port +
    '/admin-services';

  constructor(
    private http: HttpClient,
    private hostNameServiceService: HostNameServiceService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  manageCustomer(body: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/customer/manageCustomer`, body, {
      headers,
    });
  }

  listAllCustomers(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/customer/listCustomers`, { headers });
  }

  listAllCustomersName(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/customer/customerName`, { headers });
  }

  fetchCustomerInfo(custId: string) {
    return this.http
      .get(`${this.baseUrl}/customer/fetchCustomerInfo/` + custId)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    //return Observable.throw(error.message || "server error.");
    return throwError(new NotFoundError(error.message || 'server error.'));
  }
}
