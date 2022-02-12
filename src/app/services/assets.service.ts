import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostNameServiceService } from './host-name-service.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private baseUrl = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/admin-services";

  constructor(private http: HttpClient, private hostNameServiceService: HostNameServiceService,@Inject(DOCUMENT) private document: Document) {
    this.baseUrl = hostNameServiceService.getHostname();
  }

  createAsset(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/assets/createAsset`, assetJson, { headers })
  }


  fetchAsset(assetId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/assets/fetchAssetDetails/` + assetId, { headers })
  }

  fetchAssetHistory(assetId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/assets/assetsHistory/` + assetId, { headers })
  }

  fetchAllAsset(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.baseUrl}/assets/fetchAllAssets/`, { headers })
  }

  assignAsset(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/assets/assignAsset`, assetJson, { headers })
  }

  updateCarAsset(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/assets/updateCarAsset`, assetJson, { headers })
  }

  updateElectronicAsset(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post(`${this.baseUrl}/assets/updateElectronicAsset`, assetJson, { headers })
  }


}
