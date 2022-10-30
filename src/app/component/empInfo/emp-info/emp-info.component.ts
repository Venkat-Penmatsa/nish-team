import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})
export class EmpInfoComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  empDetails: any;

  ngOnInit(): void {
    let user :any = JSON.parse(localStorage.getItem("user") || '{}');
    console.log(" userDetails ........." + user);
    this.employeeService.fetchEmployeeById(user.empId)
    .subscribe(data => {
        this.empDetails = data
    });
  }

}
