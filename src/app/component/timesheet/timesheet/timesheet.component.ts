import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { EmpDetailsComponent } from '../../empInfo/emp-details/emp-details.component';
import { TimesheetDetailsComponent } from '../timesheet-details/timesheet-details.component';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private timesheetService: TimesheetService,public dialog: MatDialog) { }

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

  openDialog() {
    const dialogRef = this.dialog.open(TimesheetDetailsComponent,{
      height: '80%',
      width: '95%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
