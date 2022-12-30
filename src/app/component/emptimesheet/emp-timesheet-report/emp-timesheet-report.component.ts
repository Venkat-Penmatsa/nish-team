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


  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }



  

}

