import { Component, HostListener, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NavItem } from 'src/app/model/nav-item';
import { menu } from 'src/app/model/menu';
import { Router } from "@angular/router";
import { SharedService } from "../../../services/shared.service";
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'], encapsulation: ViewEncapsulation.None
})
export class FeaturesComponent implements OnDestroy {

  public opened: boolean = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = menu;
  headerSticky = false;
  user: User;
  roleDesc: string;

  constructor(private media: MediaObserver, private router: Router, public shared: SharedService) {
    this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
      this.handleMediaChange(mediaChange);
    })
  }

  private handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnInit(): void {
    //this.user = localStorage.getItem("userDetails");
    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
    this.shared.userRole = this.user.role;
    this.shared.loggedUsername = this.user.empName;
    if(this.shared.userRole == 'admin') {
      this.roleDesc = "Full";
    } else if(this.shared.userRole == 'hr') {
      this.roleDesc = "EMP,HR,Assets,Documents";
    }
  }

  ngOnDestroy() {
    this.mediaWatcher.unsubscribe();
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  logout() {
    this.shared.isLoggedIn = false;
    this.shared.userRole = '';
    this.shared.loggedUsername = '';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userDetails');
    this.router.navigateByUrl('/login');
  }

  changePwd() {
    this.router.navigate(['/changepwd'])
  }


}
