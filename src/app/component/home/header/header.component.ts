import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { ChangePwdComponent } from '../../login/change-pwd/change-pwd.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public shared: SharedService, public dialog: MatDialog, public authService: AuthService) { }

  userDet: any;
  userName: any;
  ngOnInit(): void {
    this.shared.currentData.subscribe((dataSub: any) => {
      if (dataSub) {
        this.userName = dataSub.firstName + " " + dataSub.lastName
      }
    })

  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangePwdComponent, {
      height: '70%',
      width: '50%',
      data: this.userDet
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  public isLoggedIn() {
    //return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.authService.clear();
    this.router.navigate(['/login']);
  }

}
