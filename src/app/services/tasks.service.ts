import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = "https://" + this.document.location.hostname + ':' + this.document.location.port + "/admin-services";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService, @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }


  fetchTasks(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/tasks/getTasks/`, { headers })
  }
}
