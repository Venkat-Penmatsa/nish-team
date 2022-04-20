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
    'comments',
    'actions'
  ];
  empLeavesBalenceList: EmpLeavesBalence[] = [];
  dataSource = new MatTableDataSource<EmpLeavesBalence>(this.empLeavesBalenceList);
  selectedDate: any;
  leaveFreezed: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private leavesService: LeavesService) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchMonthlyReport(event) {
    this.empLeavesBalenceList = [];
    this.selectedDate = moment(event.value).format("DD-MM-YYYY");
    this.callMonthlyLeaves(this.selectedDate);

  }

  validateBatch(selectedDate: any) {

    this.leaveFreezed = false;
    this.leavesService.fetchYearBatchJobStatus('FREEZE_TIMESHEET', selectedDate).subscribe(res => {
      console.log(res)
      if (res.status == 'Executed') {
        this.leaveFreezed = true;
      }
    });
  }

  callMonthlyLeaves(selectedDate: any) {

  
    this.validateBatch(selectedDate)

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteLeave(leaveRequest: any) {

    console.log("selected leave request is " + leaveRequest);

    this.leavesService.deleteLeave(leaveRequest.leaveId).subscribe(res => {
      console.log("response from service  " + res);
      let deleteLeaveRes: any = res;
      if (deleteLeaveRes.responseStatus == "success") {
        this.empLeavesBalenceList = [];
        this.callMonthlyLeaves(this.selectedDate);
      }
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
