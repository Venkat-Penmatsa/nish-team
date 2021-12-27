import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = 'http://localhost:8091';

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService) {
    this.baseUrl = hostNameServiceService.getHostname();
  }


  upload(file: File, fileName: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);

    const req = new HttpRequest('POST', `${this.baseUrl}/files/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  batchUpload(file: File, endPoint: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/` + 'batchUpload/' + endPoint, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
