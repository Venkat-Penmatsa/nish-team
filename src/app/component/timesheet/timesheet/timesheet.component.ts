import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private timesheetService: TimesheetService) { }

  contractList: any[] = [];

  ngOnInit(): void {

    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    let contract = {
      empId: user.empId,
      timeSheetDate: new Date(),
      updatedBy: user.empId
    }
    this.timesheetService.fetchActiveContract(contract)
      .subscribe(data => {
        console.log("contractList data ... " + data);
        this.contractList = data
      });

  }

}
