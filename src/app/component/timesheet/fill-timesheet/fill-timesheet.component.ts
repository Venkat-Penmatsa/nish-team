import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeavesService } from 'src/app/services/leaves.service';
import { TimesheetService } from 'src/app/services/timesheet.service';
import * as moment from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-fill-timesheet',
  templateUrl: './fill-timesheet.component.html',
  styleUrls: ['./fill-timesheet.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
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
  //date = new FormControl(moment());

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<FillTimesheetComponent>, private leavesService: LeavesService, 
    private timesheetService: TimesheetService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.user = data;
    this.empId = data.empId;
    console.log(" user " + this.user);

  }


  ngOnInit(): void {
    this.fetchTimesheet();
  }

  /*chosenYearHandler(normalizedYear: any) {
    const ctrlValue = this.date.value;
    ctrlValue?.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.date.value;
    ctrlValue?.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }*/

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
    console.log(this.selectedDate);
   // let selectedDateMonth = this.selectedDate.getMonth();
    var check = moment(this.selectedDate, 'YYYY/MM/DD');
    var month = check.format('M');
    if (Number(month) > currMonth+1) {
      this.errorMessage = "Its too early to submit the timesheet, contact your HR";
    }
    if (this.empId) {

      this.timesheetService.fetchTimeSheet(this.empId, moment(this.selectedDate).format("DD-MM-YYYY"))
      //this.timesheetService.fetchTimeSheet(this.empId, this.date.value)
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

