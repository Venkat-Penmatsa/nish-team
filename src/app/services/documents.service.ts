import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private baseUrl = 'https://3.125.8.211:8443/admin-services';

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService) {
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
