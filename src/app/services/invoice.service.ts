import { DOCUMENT } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NotFoundError, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
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

  updateInvoice(body: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/invoice/updateInvoice`, body, {
      headers,
    });
  }

  updateInvoiceSeq(body: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/invoice/updateInvoiceSeq`, body, {
      headers,
    });
  }

  downloadInvoiceReport(date: any): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/invoice/download/invoiceReport/` + date, {
        responseType: 'blob',
      })
      .pipe(catchError(this.errorHandler));
  }

  generateInvoiceReport(date: any): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/invoice/monthlyReport/` + date)
      .pipe(catchError(this.errorHandler));
  }

  fetchInvoice(invoiceId: string) {
    return this.http
      .get(`${this.baseUrl}/invoice/invoiceDetails/` + invoiceId)
      .pipe(catchError(this.errorHandler));
  }

  getInvoiceSeq() {
    return this.http
      .get(`${this.baseUrl}/invoice/invoiceSequence`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    //return Observable.throw(error.message || "server error.");
    return throwError(new NotFoundError(error.message || 'server error.'));
  }
}
