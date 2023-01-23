import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-emp-timesheet-report',
  templateUrl: './emp-timesheet-report.component.html',
  styleUrls: ['./emp-timesheet-report.component.css']
})
export class EmpTimesheetReportComponent implements OnInit {
  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  timesheetHeader: any[] = [];
  timeSheetDetails: any[] = [];
  selectedDate = new Date();
  filterEmpName: string;
  empName: any = undefined;
  dataLoaded: boolean = false;

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

  fetchAllEmpTimesheet(): void {
    console.log(" All emp timesheet ........."  );
    this.timesheetService.fetchAllEmpTimeSheet(moment(this.selectedDate).format("DD-MM-YYYY"))
      .subscribe( (data : any) => {
        console.log("data ==========> " + data);
        this.timeSheetDetails = data;
        this.header = data[0].timeSheetHeader;
        this.timesheetHeader = data[0].timeSheetHeader;
        this.timeSheetDetails.forEach( tsd => {
          const timeSheetRow :any[] = tsd.timeSheetRow;
          timeSheetRow.forEach( tsd => { 
            this.rows.push(tsd);
          });
        });
        //this.rows = data.timeSheetRow;
        console.log("  this.rows......." +  this.rows);
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
