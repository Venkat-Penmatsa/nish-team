import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MY_DATE_FORMATS } from 'src/app/common/dateformat';
import { LeavesService } from 'src/app/services/leaves.service';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter , deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ApplyLeavesComponent implements OnInit {

  leaves: any;
  hasError = false;
  selectedStartDate: any;
  selectedEndDate: any;
  halfDay: boolean = false;
  leaveStartDate: any;
  leaveEndDate: any;
  message = false;
  messageDesc = "";
  error = false;
  errorDesc = "";

  leaveForm = this.fb.group({
    leaveType: ['', Validators.required],
    leaveStartDate: ['', Validators.required],
    leaveEndDate: ['', Validators.required],
    numberOfDays: [0, Validators.required],
    halfDay: [''],
    comments: ['']
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ApplyLeavesComponent>, private leavesService: LeavesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log()
    this.leaves = data;

  }

  close(){
    this.dialogRef.close();
  }

  dateFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  }

  dateValidation(event: any) {
    console.log(event);
    const m: Moment = event.value;

    this.selectedStartDate = this.leaveForm.value.leaveStartDate;
    this.selectedEndDate = this.leaveForm.value.leaveEndDate;

    if (this.selectedStartDate && this.selectedEndDate) {

      this.leaveStartDate = this.leaveForm.value.leaveStartDate;
      this.leaveEndDate = this.leaveForm.value.leaveEndDate;

      let startDate = moment(this.leaveForm.value.leaveStartDate).format("DD-MM-YYYY");
      let endDate = moment(this.leaveForm.value.leaveEndDate).format("DD-MM-YYYY");

      this.leavesService.calculateLeaves(startDate, endDate).subscribe((res: any) => {
        console.log("data ==========> " + res.numberOfDays);
        this.leaveForm.patchValue({ numberOfDays: res.numberOfDays });
      });

    }

  }

  ngOnInit(): void {
  }

  disableEndDate(status: any) {
    console.log(status);
    if (status) {
      this.leaveForm.patchValue({ leaveEndDate: this.leaveForm.value.leaveStartDate });
      this.leaveForm.controls["leaveEndDate"].disable();
      this.leaveForm.patchValue({ numberOfDays: 0.5 });
      this.halfDay = true;
    } else {
      this.leaveForm.patchValue({ leaveEndDate: '' });
      this.leaveForm.patchValue({ numberOfDays:  0 });
      this.leaveForm.controls["leaveEndDate"].enable();
      this.halfDay = false;
    }

  }

  get f() {
    return this.leaveForm.controls;
  }
  submitLeave() {
    this.message = false;
    this.error = false;
    let validation = true;
    if (this.leaveForm.valid) {
      const leaveType = this.leaveForm.value.leaveType;

      let numberOfDays = 0;

      if (leaveType === "AA") {
        numberOfDays = this.leaves.authorisedAbsence;
      } else if (leaveType === "RTT") {
        numberOfDays = this.leaves.rttAdv;
      } else if (leaveType === "CL") {
        numberOfDays = this.leaves.compensationLeave;
      } else if (leaveType === "FL") {
        numberOfDays = this.leaves.forwardedLeave;
      }
      const calculateLeaves: number = this.leaveForm.value.numberOfDays as number;
      if (calculateLeaves > numberOfDays) {
        this.error = true;
        this.errorDesc = "You don't have enough leave balence for the selected Leave Type.";
        validation = false;
        return;
      }

      if (validation) {

        let user: any = JSON.parse(localStorage.getItem("user") || '{}');
        const applyLeave = {
          employeeId: user.empId,
          leaveType: this.leaveForm.value.leaveType,
          startDate: moment(this.leaveForm.value.leaveStartDate).format("DD-MM-YYYY"),
          endDate: moment(this.leaveForm.controls["leaveEndDate"].value).format("DD-MM-YYYY"),
          leaveAppliedBy: user.empId,
          halfDay: this.halfDay,
          numberOfDays: this.leaveForm.value.numberOfDays,
          comments: this.leaveForm.value.comments
        }
        const leavesjson = JSON.stringify(applyLeave);
        this.leavesService.applyLeaves(leavesjson).subscribe(res => {
          console.log(res)

          if (res.responseStatus == 'failed') {
            this.error = true;
            this.errorDesc = res.errorDescription;
          }
          if (res.leaveId != null) {
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
  fetchLeaveBalence() {
    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.leavesService.fetchEmpLeaves(user.empId)
      .subscribe(data => {
        this.leaves = data
      });

  }

}
