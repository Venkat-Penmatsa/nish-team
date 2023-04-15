import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MY_DATE_FORMATS } from 'src/app/common/dateformat';
import { LeavesService } from 'src/app/services/leaves.service';
import { TimesheetService } from 'src/app/services/timesheet.service';

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
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter , deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
})
export class TimesheetDetailsComponent implements OnInit {

  user:any;
  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  timesheetHeader: any[] = [];
  timeSheetDetails: any;
  selectedDate = new Date();
  empId: any;


  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<TimesheetDetailsComponent>, private timesheetService: TimesheetService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("leaves---------");
    this.user = data;
    console.log("  this.user ---------" +   this.user );
  }

/*
    constructor(
      @Inject(MAT_DIALOG_DATA) private data: { empId: any},
      @Optional() private dialogRef: MatDialogRef<TimesheetDetailsComponent>,
      private timesheetService: TimesheetService
    ) {

      console.log("*****************" + this.data.empId); 
    } */
 

  ngOnInit(): void {
    if (this.data) {
      this.empId = this.data.empId;
      this.fetchTimesheet();
    }


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
      contList.forEach((cont: any) => {
        if (!cont.isDisabled) {
          totalHours = totalHours + +cont.filledData;
        }
      }
      );
      element.noOfHrs = totalHours;
    });
  }

  fetchTimesheet(): void {

    if (this.empId) {

      this.timesheetService.fetchTimeSheet(this.empId, moment(this.selectedDate).format("DD-MM-YYYY"))
        .subscribe(data => {
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
