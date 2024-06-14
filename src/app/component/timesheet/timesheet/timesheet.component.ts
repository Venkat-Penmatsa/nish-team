import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { FillTimesheetComponent } from '../fill-timesheet/fill-timesheet.component';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  constructor(
    private timesheetService: TimesheetService,
    public dialog: MatDialog
  ) {}
  user: any;

  contractList: any[] = [];

  ngOnInit(): void {
    this.fetchContractDetails();
  }

  fetchContractDetails() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    let contract = {
      empId: this.user.empId,
      timeSheetDate: new Date(),
      updatedBy: this.user.empId,
    };
    this.timesheetService.fetchActiveContract(contract).subscribe((data) => {
      this.contractList = data;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FillTimesheetComponent, {
      height: '80%',
      width: '80%',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchContractDetails();
    });
  }
}
