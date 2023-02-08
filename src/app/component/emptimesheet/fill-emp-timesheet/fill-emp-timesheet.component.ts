import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-fill-emp-timesheet',
  templateUrl: './fill-emp-timesheet.component.html',
  styleUrls: ['./fill-emp-timesheet.component.css']
})
export class FillEmpTimesheetComponent implements OnInit {
  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  timesheetHeader: any[] = [];
  timeSheetDetails: any;
  selectedDate = new Date();
  filterEmpName: string;
  empName: any = undefined;
  dataLoaded: boolean = false;
  status: string = '';
  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }

  empNameSelected(emp: any) {
    this.empName = emp;
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


  updateTimeSheet() {
    this.status = '';
    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.timeSheetDetails.timeSheetRow = this.rows;
    this.timeSheetDetails.updatedBy = user.empId;

    this.timesheetService.updateTimeSheet(this.timeSheetDetails)
      .subscribe(data => {
        this.status = data.responseStatus;
      });

    console.log(" rows........" + this.rows);

  }

  fetchTimesheet(): void {

    console.log(" fetching timesheet " + this.empName);
    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.timesheetService.fetchTimeSheet(this.empName, moment(this.selectedDate).format("DD-MM-YYYY"))
      .subscribe(data => {
        console.log("data ==========> " + data);
        this.timeSheetDetails = data;
        this.header = data.timeSheetHeader;
        this.timesheetHeader = data.timeSheetHeader;
        this.rows = data.timeSheetRow;
        console.log(" this.leaves ........." + data);
        this.dataLoaded = true;
      });

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
