import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from './message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public snackBar: MatSnackBar,) { }

  
  public openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(MessageComponent, {
      data: message,
      //panelClass: panelClass,
      duration: 10000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
