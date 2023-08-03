import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { ChangePwdComponent } from '../../login/change-pwd/change-pwd.component';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dataFromServer: Observable<any> | undefined;
  notification: any;
  notificationCount: string | undefined;

  constructor(
    private router: Router,
    public shared: SharedService,
    public dialog: MatDialog,
    public authService: AuthService,
    private notificationService: NotificationService
  ) {}

  userDet: any;
  userName: any;
  ngOnInit(): void {
    this.shared.currentData.subscribe((dataSub: any) => {
      if (dataSub) {
        this.userName = dataSub.firstName + ' ' + dataSub.lastName;
      }
    });
    this.getDataServer();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangePwdComponent, {
      height: '70%',
      width: '50%',
      data: this.userDet,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public isLoggedIn() {
    //return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.authService.logout();
  }

  getDataServer() {
    this.notificationService.getNotification().subscribe((res: any) => {
      this.notification = res;
      this.notificationCount = this.notification?.length;
    });
  }
}
