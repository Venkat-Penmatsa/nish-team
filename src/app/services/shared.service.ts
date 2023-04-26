import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isLoggedIn: Boolean = false;
  loggedUsername: string = '';
  userRole: string = '';


  empData: any = {};
  private dataSub = new BehaviorSubject<object>(this.empData);
  currentData = this.dataSub.asObservable();
  constructor() {

  }

  changeDataSub(newSub: object) {
    console.log("serice");
    this.dataSub.next(newSub);
  }



}
