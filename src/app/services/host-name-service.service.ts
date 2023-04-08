import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HostNameServiceService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  getHostname(): string {
    // Remember to use this.document as unscoped document also exists but is not mockable.
    //return this.document.defaultView.window.location.hostname;

    // Or use the location on document.
   //const url = "https://"+ this.document.location.hostname + ':' + this.document.location.port+"/admin-services";
    
  const url =  'http://localhost:8092';
   // const url = "http://"+ this.document.location.hostname + ':' + this.document.location.port+"/admin-services";
    //const url =  'https://3.125.8.211:8443/admin-services';
    return url;

  }

}
