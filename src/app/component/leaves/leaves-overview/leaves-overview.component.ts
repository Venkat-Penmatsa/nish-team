import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LeavesService } from 'src/app/services/leaves.service';
import { ApplyLeavesComponent } from '../apply-leaves/apply-leaves.component';
import { LeavesHistoryComponent } from '../leaves-history/leaves-history.component';

@Component({
  selector: 'app-leaves-overview',
  templateUrl: './leaves-overview.component.html',
  styleUrls: ['./leaves-overview.component.css']
})
export class LeavesOverviewComponent implements OnInit {

  constructor(private leavesService: LeavesService, public dialog: MatDialog, private fb: FormBuilder) { }

  leaves: any;
  isDataLoaded: boolean = false;

  ngOnInit(): void {

    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.leavesService.fetchEmpLeaves(user.empId)
      .subscribe(data => {
        this.leaves = data
        this.isDataLoaded = true;
        console.log(" this.leaves ........." + this.leaves);
      });

  }

  openApplyLeaveDialog() {
    const dialogRef = this.dialog.open(ApplyLeavesComponent, {
      height: '80%',
      width: '80%',
      data: this.leaves
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

  openHistDialog() {
    const dialogRef = this.dialog.open(LeavesHistoryComponent, {
      height: '80%',
      width: '80%',
      data: this.leaves
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
