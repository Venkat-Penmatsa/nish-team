import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.css']
})
export class TimesheetDetailsComponent implements OnInit {

  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  displayedColumns = ['key'];
  timesheetHeader: any[] = [];

  constructor(private timesheetService: TimesheetService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {

    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.timesheetService.fetchTimeSheet(user.empId, '02-12-2022' )
      .subscribe(data => {
        this.header = data.timeSheetHeader;
        this.timesheetHeader = data.timeSheetHeader;
        this.rows = data.timeSheetRow;
        this.timesheetDataSource = data.timeSheetRow;
        console.log(" this.leaves ........." + data);
      });

  }

  UpdateTimeSheet(){

  }

}

interface Timesheet {
  contractId: string;
  comments: string;
  noOfHrs: string;
  contractTimeSheetList :{
    day: string;
    dayName : string;
    isDisabled : boolean;
    filledData : string;
  }
}
