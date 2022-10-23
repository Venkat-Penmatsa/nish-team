import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public isLoggedIn() {
    //return this.userAuthService.isLoggedIn();
  }

  public logout() {
    //this.userAuthService.clear();
    //this.router.navigate(['/home']);
  }

}
