import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isLoggedIn: Boolean = false;
  loggedUsername: string = '';
  userRole: string = '';
}
