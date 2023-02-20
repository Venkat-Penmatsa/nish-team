import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { saveAs as importedSaveAs } from "file-saver";
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeavesService } from 'src/app/services/leaves.service';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM-YYYY',
  },
  display: {
    dateInput: 'MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-emp-timesheet-report',
  templateUrl: './emp-timesheet-report.component.html',
  styleUrls: ['./emp-timesheet-report.component.css']
})
export class EmpTimesheetReportComponent implements OnInit {
  /*
  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  timesheetHeader: any[] = [];
  timeSheetDetails: any[] = [];
  selectedDate = new Date();
  filterEmpName: string;
  empName: any = undefined;
  dataLoaded: boolean = false;

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  calculateHours(data: any) {

    console.log(" data ........." + data);
    this.rows.forEach((element) => {
      let contList: any = element.contractTimeSheetList;
      let totalHours = 0;
      contList.forEach((cont: any) => {
        if (!cont.isDisabled) {
          totalHours = totalHours + +cont.filledData;
        }
      }
      );
      element.noOfHrs = totalHours;
    });
  }

  fetchAllEmpTimesheet(): void {
    console.log(" All emp timesheet ........."  );
    this.timesheetService.fetchAllEmpTimeSheet(moment(this.selectedDate).format("DD-MM-YYYY"))
      .subscribe( (data : any) => {
        console.log("data ==========> " + data);
        this.timeSheetDetails = data;
        this.header = data[0].timeSheetHeader;
        this.timesheetHeader = data[0].timeSheetHeader;
        this.timeSheetDetails.forEach( tsd => {
          const timeSheetRow :any[] = tsd.timeSheetRow;
          timeSheetRow.forEach( tsd => { 
            this.rows.push(tsd);
          });
        });
        //this.rows = data.timeSheetRow;
        console.log("  this.rows......." +  this.rows);
        this.dataLoaded = true;
      });
  } */

  date = new FormControl(moment());
  message = false;
  messageDesc = "";
  loading$: any;
  selectedDate: any;
  // loading$ = new BehaviorSubject<boolean>(false);


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    if(ctrlValue!= null){
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
    }

  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    if(ctrlValue!= null){
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
    }

  }

  displayedColumns: string[] = ['employeeid',
    'workingdays', 'actualWorkingDays', 'totalBillableDays', 'totalBenchDays',
    'totalleaves',
    'totalsickleaves',
    'totalauthorisedabsence',
    'totalrttadvleaves',
    'totalotherleaves',
    'compensationLeave',
    'forwardedLeave',
    'totalmaternityleaves',
    'totalpaternityleaves',
    'totalovertimeleaves',
    'totalunauthabsleaves',
    'totalforcedmajeureleaves'
  ];

  allEmployeesTimeSheetReport: AllEmployeesTimeSheetReport[] = [];
  dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private leavesService: LeavesService, public loader: LoaderService, public timesheetService: TimesheetService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loading$ = this.loader.loading$;
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchMonthlyReport(event) {
    this.message = false;
    this.allEmployeesTimeSheetReport = [];
    this.dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
    this.selectedDate = moment(event.value).format("DD-MM-YYYY");
    this.leavesService.fetchAllEmpLeavesMonthlyReport(this.selectedDate).subscribe(res => {

      if (res.validationMessage != null) {
        this.message = true;
        this.messageDesc = res.validationMessage;
      }

      var empTimesheet = res.monthlyTimeSheetReport;
      console.log(empTimesheet);
      empTimesheet.forEach(e => {
        this.allEmployeesTimeSheetReport.push(new AllEmployeesTimeSheetReport(e.employeeid,
          e.totalsickleaves,
          e.totalauthorisedabsence,
          e.totalmaternityleaves,
          e.totalpaternityleaves,
          e.totalrttadvleaves,
          e.totalovertimeleaves,
          e.totalunauthabsleaves,
          e.totalforcedmajeureleaves,
          e.totalotherleaves,
          e.workingdays,
          e.actualWorkingDays,
          e.totalBillableDays,
          e.totalBenchDays,
          e.totalleaves,
          e.totalcompenstionleaves,
          e.totalforwardedleaves
          ));
      })
      this.dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
      this.dataSource.paginator = this.paginator;
    });

  }

  ngOnInit(): void {
    this.message = false;
    console.log("this.loading$..." + this.loading$)
    this.loading$ = this.loader.loading$;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  monthlyTimeSheet() {

    this.timesheetService.downloadMonthlyTimeSheet(this.selectedDate).subscribe(res => {
      console.log(res);

      let blob: any = new Blob([res], { type: 'text/json; charset=utf-8' });
      importedSaveAs(blob, this.selectedDate + '-MonthlyTimeSheet.xls');

    }
    );
  }

}


export class AllEmployeesTimeSheetReport {
  constructor(
    private employeeid: string,
    private totalsickleaves: number,
    private totalauthorisedabsence: number,
    private totalmaternityleaves: number,
    private totalpaternityleaves: number,
    private totalrttadvleaves: number,
    private totalovertimeleaves: number,
    private totalunauthabsleaves: number,
    private totalforcedmajeureleaves: number,
    private totalotherleaves: number,
    private workingdays: number,
    private actualWorkingDays: number,
    private totalBillableDays: number,
    private totalBenchDays: number,
    private totalleaves: number,
    private totalcompenstionleaves: number,
    private totalforwardedleaves: number
  ) { }
}


interface Timesheet {
  contractId: string;
  comments: string;
  noOfHrs: string;
  contractTimeSheetList: {
    day: string;
    dayName: string;
    isDisabled: boolean;
    filledData: string;
  }
}
