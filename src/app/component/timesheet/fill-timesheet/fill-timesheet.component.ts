import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeavesService } from 'src/app/services/leaves.service';
import { TimesheetService } from 'src/app/services/timesheet.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fill-timesheet',
  templateUrl: './fill-timesheet.component.html',
  styleUrls: ['./fill-timesheet.component.css']
})
export class FillTimesheetComponent implements OnInit {

  user: any;
  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  timesheetHeader: any[] = [];
  timeSheetDetails: any;
  selectedDate = new Date();
  empId: any;
  timeSheetFlag: boolean = false;
  errorMessage: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<FillTimesheetComponent>, private leavesService: LeavesService, private timesheetService: TimesheetService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.user = data;
    this.empId = data.empId;
    console.log(" user " + this.user);

  }


  ngOnInit(): void {

    this.fetchTimesheet();

  }

  updateTimeSheet() {
    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.timeSheetDetails.timeSheetRow = this.rows;
    this.timeSheetDetails.updatedBy = user.empId;

    this.timesheetService.updateTimeSheet(this.timeSheetDetails)
      .subscribe(data => {
        console.log(" this.leaves ........." + data);
      });

    console.log(" rows........" + this.rows);

  }

  calculateHours(data: any) {

    console.log(" data ........." + data);

    this.rows.forEach((element) => {

      let contList: any = element.contractTimeSheetList;
      let totalHours = 0;
      contList.forEach((num: any) => {
        if (this.checkNumber(num)) {
          totalHours = totalHours + +num.filledData;
        } else if (num.filledData && num.filledData === "HL") {
          totalHours = totalHours + 4;
        }
      }
      );
      element.noOfHrs = totalHours;
    });
  }

  checkNumber(num: any) {
    return (typeof (num.filledData) === 'number' || typeof (num.filledData) === "string" && num.filledData.trim() !== '') && !isNaN(num.filledData as number);
  }

  close() {
    this.dialogRef.close();
  }
  fetchTimesheet(): void {

    this.timeSheetFlag = false;
    this.errorMessage = "";
    let currMonth = new Date().getMonth();
    let selectedDateMonth = this.selectedDate.getMonth();
    if (selectedDateMonth > currMonth) {
      this.errorMessage = "Its too early to submit the timesheet, contact your HR";
    }
    if (this.empId) {

      this.timesheetService.fetchTimeSheet(this.empId, moment(this.selectedDate).format("DD-MM-YYYY"))
        .subscribe(data => {
          this.timeSheetFlag = data.timeSheetFlag;
          this.timeSheetDetails = data;
          this.header = data.timeSheetHeader;
          this.timesheetHeader = data.timeSheetHeader;
          this.rows = data.timeSheetRow;
          console.log(" this.leaves ........." + data);
        });
    }
  }

}

interface Timesheet {
  contractId: string;
  comments: string;
  noOfHrs: string;
  contractTimeSheetList: {
    day: string;
    dayName: string;
    isDisabled: boolean;
    filledData: string;
  }
}

