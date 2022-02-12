import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import { HostNameServiceService } from './host-name-service.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private baseUrl = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/admin-services";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService,@Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  createDocsCategory(docCategory: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/document/createDocsCategory/`+docCategory, { headers })
  }

  fetchDocsCategory(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/document/fetchDocsCategory`, { headers })
  }


}
