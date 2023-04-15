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
      contList.forEach((cont: any) => {
        if (!cont.isDisabled) {
          totalHours = totalHours + +cont.filledData;
        }
      }
      );
      element.noOfHrs = totalHours;
    });
  }

  close(){
    this.dialogRef.close();
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

