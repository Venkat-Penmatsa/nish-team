import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NewcontractService {

  private REST_API_SERVER = "http://localhost:8091/contract/newContract";

  constructor(private httpClient: HttpClient) { }

  // public createNewContractRequest() {
  //   return this.httpClient.get(this.REST_API_SERVER);
  // }


  // public   createNewContractRequest(String:Person): Observable<any> {
  //   const headers = { 'content-type': 'application/json'}  
  //   const body=JSON.stringify(person);
  //   console.log(body)
  //   return this.http.post(this.baseURL + 'people', body,{'headers':headers})
  // }

}
