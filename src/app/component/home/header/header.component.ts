import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,public shared: SharedService, public authService : AuthService) { }

  ngOnInit(): void {
  }

  changePwd() {
    this.router.navigate(['/changepwd'])
  }


  public isLoggedIn() {
    //return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.authService.clear();
    this.router.navigate(['/login']);
  }

}
