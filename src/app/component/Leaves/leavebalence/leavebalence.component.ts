import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeavesService } from 'src/app/services/leaves.service';
import * as _moment from 'moment';
import moment from 'moment';

@Component({
  selector: 'app-leavebalence',
  templateUrl: './leavebalence.component.html',
  styleUrls: ['./leavebalence.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeavebalenceComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['leaveId',
    'employeeId',
    'leaveType',
    'startDate',
    'endDate',
    'status',
    'leaveAppliedBy',
    'leaveAppliedDate',
    'numberOfDays',
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

  fetchMonthlyReport(event){
    this.empLeavesBalenceList = [];
    let selectedDate = moment(event.value).format("DD-MM-YYYY");
    this.leavesService.fetchAllEmpLeaves(selectedDate).subscribe(res => {
      console.log(res)
      res.forEach(e => {
        this.empLeavesBalenceList.push(new EmpLeavesBalence(e.leaveId,
          e.employeeId,
          e.leaveType,
          e.startDate,
          e.endDate,
          e.status,
          e.leaveAppliedBy,
          e.leaveAppliedDate,
          e.numberOfDays,
          e.comments
        ));
      })
      this.dataSource = new MatTableDataSource<EmpLeavesBalence>(this.empLeavesBalenceList);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {

 
  }

}

export class EmpLeavesBalence {
  constructor(
    private leaveId: string,
    private employeeId: string,
    private leaveType: string,
    private startDate: string,
    private endDate: string,
    private status: string,
    private leaveAppliedBy: string,
    private leaveAppliedDate: string,
    private numberOfDays: string,
    private comments: string
  ) { }
}
