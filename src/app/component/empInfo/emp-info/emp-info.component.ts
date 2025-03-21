import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmpDetailsComponent } from '../emp-details/emp-details.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})
export class EmpInfoComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private sharedService: SharedService,
    public dialog: MatDialog, private fb: FormBuilder) { }
  empDetails: any;
  empBasicInfo: any;
  isDataLoaded: boolean = false;

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.employeeService.fetchEmployeeById(user.empId)
      .subscribe(data => {
        this.sharedService.changeDataSub(data.empBasicInfo);
        this.empDetails = data
        this.empBasicInfo = data.empBasicInfo;
        this.isDataLoaded = true;
        localStorage.setItem('empName', data.empBasicInfo.firstName + " " + data.empBasicInfo.lastName);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmpDetailsComponent, {
      height: '80%',
      width: '80%',
      data: this.empDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  empInfoForm = this.fb.group({
    empId: [],
    firstName: ['', Validators.required],
    dob: ['', Validators.required],

  });

}


