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


  upload(file: File, fileType: string, category: string, user: string, reqType: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    formData.append('category', category);
    formData.append('user', user);
    formData.append('reqType', reqType);
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

  
  fetchAllDocuments(category:string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/files/fetchAllDocumentList/`+category, { headers })
  }

  deleteDocument(documentId:string, documentPath:string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/files/delete/`+documentId+'/'+documentPath, { headers })
  }

  downloadDocuments(documentPath:string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/files/download/`+documentPath, {responseType: 'blob'})
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
