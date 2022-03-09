import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkInterceptorService implements HttpInterceptor {

  totalRequests = 0;
  requestsCompleted = 0;

  constructor(private loader: LoaderService) { }

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("In networking calls ");
    this.loader.show();
    this.totalRequests++;
    return next.handle(request).pipe(
      finalize(() => {

        this.requestsCompleted++;

        console.log(this.requestsCompleted, this.totalRequests);

        if (this.requestsCompleted === this.totalRequests) {
          this.loader.hide();
          this.totalRequests = 0;
          this.requestsCompleted = 0;
        }
      })
    );
  }
}
