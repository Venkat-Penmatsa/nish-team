import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  base64Data: any;
  retrievedImage: any;
  imageLoading = false;

  constructor(private employeeService: EmployeeService) {}

  userDet: any;
  userName: any;
  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadEmployeeImage(user.empId);
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
          this.retrievedImage = 'data:image/png;base64,' + imgData;
        } else {
          this.retrievedImage = null;
        }
      },
      error: (error) => {
        console.error('Error loading image', error);
        this.imageLoading = false;
        this.retrievedImage = null;
      },
    });
  }
}
