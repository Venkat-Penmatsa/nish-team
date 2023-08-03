import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NOTIFICATION, Notification } from '../mockData/notification';

@Injectable()
export class NotificationService {
  constructor() {}
  public getNotification(): Observable<Notification[]> {
    return of(NOTIFICATION);
  }
}
