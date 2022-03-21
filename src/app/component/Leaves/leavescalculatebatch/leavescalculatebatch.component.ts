import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeavesService } from 'src/app/services/leaves.service';
import * as _moment from 'moment';
import moment from 'moment';
import { User } from 'src/app/model/User';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-leavescalculatebatch',
  templateUrl: './leavescalculatebatch.component.html',
  styleUrls: ['./leavescalculatebatch.component.css']
})
export class LeavescalculatebatchComponent implements OnInit,OnChanges {

  displayedColumns: string[] = ['batchJobName',
    'batchYear',
    'batchMonth',
    'executionDate',
    'status',
    'batchTriggeredBy',
    'comments'
  ];
  batchJobList: BatchJob[] = [];
  dataSource = new MatTableDataSource<BatchJob>(this.batchJobList);
  message = false;
  messageDesc = "";
  user: User;
  selectedMonth: string;
  selectedYear: string;
  selectedFreezeMonth: Date;
  freezeTimeSheetDate:string;
  error=false;
  errorDesc="";
  loading$:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private leavesService: LeavesService , private loader: LoaderService) {

  }

  ngOnInit(): void {
    this.fetchExecutedBatchJobs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading$ = this.loader.loading$;
 }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  triggerSOYLeaves() {
    this.message = false;
    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
    let selectedDate = moment(this.selectedYear).format("DD-MM-YYYY");
    this.leavesService.triggerSOYLeaves(selectedDate, this.user.empName).subscribe(res => {
      console.log(res)
      this.message = true;
      this.messageDesc = res.responseStatus + " " + res.errorDescription;
      this.fetchExecutedBatchJobs();
    });
  }

  triggerRTTLeaves() {
    this.message = false;
    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
    let selectedDate = moment(this.selectedMonth).format("DD-MM-YYYY");
    this.leavesService.triggerRTTLeaves(selectedDate, this.user.empName).subscribe(res => {
      console.log(res)
      this.message = true;
      this.messageDesc = res.responseStatus + " " + res.errorDescription;
      this.fetchExecutedBatchJobs();
    });
  }

  freezeTimeSheetJob() {
    this.message = false;
    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
    this.leavesService.freezeTimeSheetJob(this.freezeTimeSheetDate, this.user.empName).subscribe(res => {
      console.log(res)
      this.message = true;
      this.messageDesc = res.responseStatus + " " + res.errorDescription;
      this.fetchExecutedBatchJobs();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetechYearJobStatus(event) {
    let selectedDate = moment(event.value).format("DD-MM-YYYY");
    console.log(selectedDate);
    const status = this.batchService(selectedDate, 'YEAR_START_LEAVES')
  }


  fetchMonthlyReport(event) {
    let selectedDate = moment(event.value).format("DD-MM-YYYY");
    const status = this.batchService(selectedDate, 'RTT_MONTH_LEAVES');
  }

  fetchFreezeTimeSheetReport(event) {
    let selectedDate = moment(event.value).format("DD-MM-YYYY");
    this.freezeTimeSheetDate = selectedDate;
    const status = this.batchService(selectedDate, 'FREEZE_TIMESHEET');
  }


  batchService(selectedDate: any, batchName: string) {
    
    this.error = false;
    this.leavesService.fetchYearBatchJobStatus(batchName, selectedDate).subscribe(res => {
      console.log(res)
      if (res.status == 'NOT_EXECUTED' && batchName == 'YEAR_START_LEAVES') {
        let button = <HTMLButtonElement>document.getElementById('yearButton');
        button.disabled = false;
      } else if (res.status == 'NOT_EXECUTED' && batchName == 'RTT_MONTH_LEAVES') {
        let button = <HTMLButtonElement>document.getElementById('monthButton');
        button.disabled = false;
      } else if (res.status == 'NOT_EXECUTED' && batchName == 'FREEZE_TIMESHEET') {
        let button = <HTMLButtonElement>document.getElementById('timeSheetFreezeButton');
        button.disabled = false;
      } else {
        this.error = true;
        this.errorDesc = res.batchJobName + " Batch Job Already Executed for the Period " + res.batchMonth + "-" + res.batchYear + " On  " + res.executionDate;
      }
    });
  }

  fetchExecutedBatchJobs() {
    this.batchJobList = [];
    this.leavesService.fetchBatchJobs().subscribe(res => {
      console.log(res)
      res.forEach(e => {
        this.batchJobList.push(new BatchJob(e.batchJobName,
          e.executionDate,
          e.status,
          e.batchYear,
          e.batchMonth,
          e.comments,
          e.responseStatus,
          e.errorDescription,
          e.errorCode,
          e.batchTriggeredBy
        ));
      })
      this.dataSource = new MatTableDataSource<BatchJob>(this.batchJobList);
      this.dataSource.paginator = this.paginator;
    });
  }


}

export class BatchJob {
  constructor(
    private batchJobName: string,
    private executionDate: Date,
    private status: string,
    private batchYear: string,
    private batchMonth: string,
    private comments: string,
    private responseStatus: string,
    private errorDescription: string,
    private errorCode: string,
    private batchTriggeredBy: string
  ) { }
}

