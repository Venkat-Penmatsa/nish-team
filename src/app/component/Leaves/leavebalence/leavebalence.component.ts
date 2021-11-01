import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeavesService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-leavebalence',
  templateUrl: './leavebalence.component.html',
  styleUrls: ['./leavebalence.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeavebalenceComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['employeeId',
    'sickLeave',
    'authorisedAbsence',
    'rttAdv',
    'overtime',
    'unauthorisedAbsence',
    'forceMajeure',
    'other',
    'forwardedLeave',
    'totalleavebalence',
    'lastUpdateDate',
    'updatedBy',
    'comments'
  ];
  empLeavesBalenceList: EmpLeavesBalence[] = [];
  dataSource = new MatTableDataSource<EmpLeavesBalence>(this.empLeavesBalenceList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private leavesService: LeavesService) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.leavesService.fetchAllEmpLeaves().subscribe(res => {
      console.log(res)
      res.forEach(e => {
        this.empLeavesBalenceList.push(new EmpLeavesBalence(e.leavebalenceid,
          e.leaveyear,
          e.employeeId,
          e.sickLeave,
          e.authorisedAbsence,
          e.maternityLeave,
          e.parentalLeave,
          e.holiday,
          e.rttAdv,
          e.overtime,
          e.unauthorisedAbsence,
          e.forceMajeure,
          e.other,
          e.compensationLeave,
          e.forwardedLeave,
          e.totalleavebalence,
          e.lastUpdateDate,
          e.updatedBy,
          e.comments
        ));
      })
      this.dataSource = new MatTableDataSource<EmpLeavesBalence>(this.empLeavesBalenceList);
      this.dataSource.paginator = this.paginator;
    });
  }

}

export class EmpLeavesBalence {
  constructor(
    private leavebalenceid: string,
    private leaveyear: string,
    private employeeId: string,
    private sickLeave: string,
    private authorisedAbsence: string,
    private maternityLeave: string,
    private parentalLeave: string,
    private holiday: string,
    private rttAdv: string,
    private overtime: string,
    private unauthorisedAbsence: string,
    private forceMajeure: string,
    private other: string,
    private compensationLeave: string,
    private forwardedLeave: string,
    private totalleavebalence: string,
    private lastUpdateDate: string,
    private updatedBy: string,
    private comments: string,
  ) { }
}
