import {
  Component,
  HostListener,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NavItem } from 'src/app/model/nav-item';
import { menu } from 'src/app/model/menu';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { User } from 'src/app/model/User';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/model/Employee';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FeaturesComponent implements OnDestroy {
  public opened: boolean = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = menu;
  headerSticky = false;
  user: User;
  roleDesc: string;
  base64Data: any;
  retrievedImage: any;
  employee: Employee = new Employee();
  imageLoading = false;
  imageUrl: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public shared: SharedService
  ) {}

  ngOnInit(): void {
    //this.user = localStorage.getItem("userDetails");
    this.user = JSON.parse(localStorage.getItem('userDetails') || '{}') as User;
    this.shared.userRole = this.user.role;
    this.shared.loggedUsername = this.user.empName;
    if (this.shared.userRole == 'admin') {
      this.roleDesc = 'Full';
    } else if (this.shared.userRole == 'hr') {
      this.roleDesc = 'EMP,HR,Assets,Documents';
    }
    this.loadEmployeeImage(this.user.empId);
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
    this.router.navigate(['/changepwd']);
  }

  loadEmployeeImage(empName: string) {
    console.log('loadEmployeeImage...' + empName);
    this.imageLoading = true;
    this.retrievedImage = null;
    this.employeeService.getEmployeeImage(empName).subscribe({
      next: (response: any) => {
        console.log('API response:', response);
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
