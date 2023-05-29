import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
export class EmpTimesheetReportComponent implements OnInit,AfterViewInit  {

  date = new FormControl(moment());
  message = false;
  messageDesc = "";
  loading$: any;
  selectedDate: any;
  // loading$ = new BehaviorSubject<boolean>(false);


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    if (ctrlValue != null) {
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
    }

  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    if (ctrlValue != null) {
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
    }

  }

  displayedColumns: string[] = ['empId',
    'contractPeriod', 
    'contractId', 
    'contractType', 
    'totalWorkingDays',
    'contractWorkingDays',
    'numberOfFilledHours',
    'filledDays',
    'numberOfLeaves',
    'comments',
    'hrComments'
  ];

  allEmployeesTimeSheetReport: AllEmployeesTimeSheetReport[] = [];
  dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private leavesService: LeavesService, private _liveAnnouncer: LiveAnnouncer,
    public loader: LoaderService, public timesheetService: TimesheetService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loading$ = this.loader.loading$;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: any) {
    console.log("sorted")
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  fetchMonthlyReport(event) {
    this.message = false;
    this.allEmployeesTimeSheetReport = [];
    this.dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
    this.selectedDate = moment(event.value).format("DD-MM-YYYY");
    this.timesheetService.generateContractBasedTimeSheetReport(this.selectedDate).subscribe(res => {

      if (res.validationMessage != null) {
        this.message = true;
        this.messageDesc = res.validationMessage;
      }

      var empTimesheet = res.allEmployeesTimeSheet;
      console.log(empTimesheet);
      empTimesheet.forEach(e => {
        this.allEmployeesTimeSheetReport.push(new AllEmployeesTimeSheetReport(e.empId,
          e.contractPeriod,
          e.contractId,
          e.contractType,
          e.totalWorkingDays,
          e.contractWorkingDays,
          e.numberOfFilledHours,
          e.filledDays,
          e.numberOfLeaves,
          e.comments,
          e.hrComments
        ));
      })
      this.dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    private empId: string,
    private contractPeriod: string,
    private contractId: string,
    private contractType: string,
    private totalWorkingDays: number,
    private contractWorkingDays: number,
    private numberOfFilledHours: number,
    private filledDays: number,
    private numberOfLeaves: number,
    private comments: string,
    private hrComments: string
  ) { }
}
