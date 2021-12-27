
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';
import { Moment } from 'moment';
import { User } from 'src/app/model/User';
import { LeavesService } from 'src/app/services/leaves.service';
import { leaveBalence, leaveClassNameType } from '../../../constants/leaveClassNameType';


@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyleaveComponent implements OnInit {


  leaveList = leaveBalence;
  filterEmpName: string;
  empName: any;
  showleaves = false;
  hasError = false;
  selectedStartDate: Date;
  selectedEndDate: Date;
  startDate = new Date();
  message = false;
  messageDesc = "";
  user: User;
  leaveStartDate = moment();
  leaveEndDate = moment();

  constructor(private fb: FormBuilder, private leavesService: LeavesService) {

  }

  ngOnInit(): void {

  }

  dateFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  } 


  empNameSelected(emp: any) {
    this.empName = emp;
    this.fetchLeaveBalence();
  }

  fetchLeaveBalence() {
    this.leavesService.fetchEmpLeaves(this.empName).subscribe(res => {
      console.log("data ==========> " + res);
      const keys = Object.keys(res);

      this.leaveList.forEach(leave => {
        leave.value = res[leave.key];
      })
      this.showleaves = true;
    });

    console.log("data ==========> " + this.leaveList);
  }

  dateValidation(event) {
    console.log(event);
    const m: Moment = event.value;

    this.selectedStartDate = this.leaveForm.value.leaveStartDate;
    this.selectedEndDate = this.leaveForm.value.leaveEndDate;

    if (this.selectedStartDate && this.selectedEndDate) {

      this.leaveStartDate = this.leaveForm.value.leaveStartDate;
      this.leaveEndDate = this.leaveForm.value.leaveEndDate;

      let startDate = moment(this.leaveForm.value.leaveStartDate).format("DD-MM-YYYY");
      let endDate = moment(this.leaveForm.value.leaveEndDate).format("DD-MM-YYYY");

      this.leavesService.calculateLeaves(startDate, endDate).subscribe(res => {
        console.log("data ==========> " + res.numberOfDays);
        this.leaveForm.patchValue({ numberOfDays: res.numberOfDays });
      });

    }

  }

  submitLeave() {
    this.message = false;
    let validation = true;
    if (this.leaveForm.valid) {
      const leaveType = this.leaveForm.value.leaveType;
      this.leaveList.forEach(leave => {
        if (leave.code === leaveType) {
          const numberOfDays = leave.value
          if (this.leaveForm.value.numberOfDays > numberOfDays) {
            this.message = true;
            this.messageDesc = "Employee does not have enough Leaves";
            validation = false;
            return;
          }
        }
      });
      if (validation) {

        this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
        const applyLeave = {
          employeeId: this.empName,
          leaveType: this.leaveForm.value.leaveType,
          startDate: moment(this.leaveForm.value.leaveStartDate).format("DD-MM-YYYY"),
          endDate:  moment(this.leaveForm.value.leaveEndDate).format("DD-MM-YYYY"),
          leaveAppliedBy: this.user.empId,
          halfDay: this.leaveForm.value.halfDay,
          numberOfDays: this.leaveForm.value.numberOfDays,
          comments: this.leaveForm.value.comments
        }
        const leavesjson = JSON.stringify(applyLeave);
        this.leavesService.applyLeaves(leavesjson).subscribe(res => {
          console.log(res)
          
            if(res.responseStatus == 'failed'){
              this.message = true;
              this.messageDesc = res.errorDescription;
            } 
            
            if (res.leaveId != null)  {
              this.message = true;
              this.messageDesc = "Leave applied successfully";
              this.fetchLeaveBalence();
              this.leaveForm.reset();
            }
          
        });

      }
    } else {
      this.hasError = true;
    }

  }

  disableEndDate(status: any) {
    console.log(status);
    this.leaveForm.patchValue({ leaveEndDate: this.leaveForm.value.leaveStartDate });
    this.leaveForm.controls["leaveEndDate"].disable();
    this.leaveForm.patchValue({ numberOfDays: 0.5 });
  }

  get f() {
    return this.leaveForm.controls;
  }

  leaveForm = this.fb.group({
    leaveType: ['', Validators.required],
    leaveStartDate: ['', Validators.required],
    leaveEndDate: ['', Validators.required],
    numberOfDays: [''],
    halfDay: [''],
    comments: ['']
  });



}
