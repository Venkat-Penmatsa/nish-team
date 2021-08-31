import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private http: HttpClient) {

  }

  createAsset(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/assets/createAsset', assetJson, { headers })
  }


  fetchAsset(assetId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/assets/fetchAssetDetails/' + assetId, { headers })
  }

  fetchAssetHistory(assetId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/assets/assetsHistory/' + assetId, { headers })
  }

  fetchAllAsset(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get('http://localhost:8091/assets/fetchAllAssets/', { headers })
  }

  assignAsset(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/assets/assignAsset', assetJson, { headers })
  }

  updateCarAsset(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/assets/updateCarAsset', assetJson, { headers })
  }

  updateElectronicAsset(assetJson: any): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.post('http://localhost:8091/assets/updateElectronicAsset', assetJson, { headers })
  }


}
