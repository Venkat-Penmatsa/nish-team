import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MobilityService } from 'src/app/services/mobility.service';

@Component({
  selector: 'app-mobilityhistory',
  templateUrl: './mobilityhistory.component.html',
  styleUrls: ['./mobilityhistory.component.css'],
})
export class MobilityhistoryComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<MobilityhistoryComponent>,
    private mobilityService: MobilityService,
    private fb: FormBuilder
  ) {}

  displayedColumns: string[] = [
    'monthName',
    'compHouse',
    'compTravelPass',
    'compOthers',
    'totalAllowanceApplied',
    'comments',
  ];

  applieMobilityMonths: ApplieMobilityMonths[] = [];
  dataSource = new MatTableDataSource<ApplieMobilityMonths>(
    this.applieMobilityMonths
  );

  ngOnInit(): void {
    this.fetchAllMonthsMobility();
  }

  close() {
    this.dialogRef.close();
  }

  fetchAllMonthsMobility(): any {
    let user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.applieMobilityMonths = [];
    this.dataSource = new MatTableDataSource<ApplieMobilityMonths>(
      this.applieMobilityMonths
    );
    this.mobilityService
      .fetchEmpAllMonthsMobility(user.empId)
      .subscribe((res) => {
        res.forEach((e: any) => {
          this.applieMobilityMonths.push(
            new ApplieMobilityMonths(
              e.monthName,
              e.compHouse,
              e.compTravelPass,
              e.compOthers,
              e.totalAllowanceApplied,
              e.comments,
              e.updatedBy,
              e.appliedDate
            )
          );
        });
        this.dataSource = new MatTableDataSource<ApplieMobilityMonths>(
          this.applieMobilityMonths
        );
        this.dataSource.paginator = this.paginator;
      });
    return 'Success';
  }
}

export class ApplieMobilityMonths {
  constructor(
    private monthName: string,
    private compHouse: number,
    private compTravelPass: number,
    private compOthers: number,
    private totalAllowanceApplied: number,
    private comments: string,
    private updatedBy: string,
    private updateDate: Date
  ) {}
}
