import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { ChangePwdComponent } from '../../login/change-pwd/change-pwd.component';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { PolicyComponent } from '../policy/policy.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dataFromServer: Observable<any> | undefined;
  notification: any;
  notificationCount: string | undefined;
  policies: any;
  base64Data: any;
  retrievedImage: any;
  imageLoading = false;

  constructor(
    private router: Router,
    public shared: SharedService,
    private employeeService: EmployeeService,
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
    let user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadEmployeeImage(user.empId);
  }

  openPolicyDialog() {
    const dialogRef = this.dialog.open(PolicyComponent, {
      height: '80%',
      width: '80%',
      data: this.policies,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangePwdComponent, {
      height: '100%',
      width: '100%',
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

  loadEmployeeImage(empName: string) {
    console.log('loadEmployeeImage...' + empName);
    this.imageLoading = true;
    this.retrievedImage = null;
    this.employeeService.getEmployeeImage(empName).subscribe({
      next: (response: any) => {
        const imgData = response.empImage || response.image || response.img; // Try all possible keys
        if (imgData && Array.isArray(imgData)) {
          const byteArray = new Uint8Array(imgData);
          let binary = '';
          for (let i = 0; i < byteArray.length; i++) {
            binary += String.fromCharCode(byteArray[i]);
          }
          const base64String = window.btoa(binary);
          this.retrievedImage = 'data:image/png;base64,' + base64String;
        } else if (imgData) {
          // If response.image is already a base64 string
          this.retrievedImage = 'data:image/png;base64,' + imgData;
        } else {
          this.retrievedImage = null;
        }
        // imageLoading will be set to false in (load) event in HTML
      },
      error: (error) => {
        console.error('Error loading image', error);
        this.imageLoading = false;
        this.retrievedImage = null;
      },
    });
  }
}
