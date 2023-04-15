import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeavesService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-leaves-history',
  templateUrl: './leaves-history.component.html',
  styleUrls: ['./leaves-history.component.css']
})
export class LeavesHistoryComponent implements OnInit {

  constructor(private leavesService: LeavesService, public dialogRef: MatDialogRef<LeavesHistoryComponent>) { }

  displayedColumns: string[] = ['srNO',
    'leaveType',
    'leaveStartDate',
    'leaveEndDate',
    'noOfDays',
    'comments'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  leaves: Leaves[] = [];
  dataSource = new MatTableDataSource<Leaves>(this.leaves);

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.leavesService.fetchEmpLeavesHist(user.empId)
      .subscribe(data => {

        data.forEach((e: any) => {
          this.leaves.push(new Leaves(e.sno,
            e.leaveType,
            e.leaveStartDate,
            e.leaveEndDate,
            e.totDays,
            e.status,
            e.comments));
        })
        this.dataSource = new MatTableDataSource<Leaves>(this.leaves);
        this.dataSource.paginator = this.paginator;

        this.leaves = data
        console.log("leaves history........." + this.leaves);
      });

  }
}

export class Leaves {
  constructor(
    private sno: string,
    private leaveType: string,
    private leaveStartDate: string,
    private leaveEndDate: string,
    private totDays: number,
    private status: string,
    private comments: string
  ) { }
}
