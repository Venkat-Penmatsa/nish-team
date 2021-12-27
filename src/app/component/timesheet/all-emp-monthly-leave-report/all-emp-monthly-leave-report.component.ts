import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeavesService } from 'src/app/services/leaves.service';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

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
  selector: 'app-all-emp-monthly-leave-report',
  templateUrl: './all-emp-monthly-leave-report.component.html',
  styleUrls: ['./all-emp-monthly-leave-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AllEmpMonthlyLeaveReportComponent implements OnInit {
  date = new FormControl(moment());
  message = false;
  messageDesc = "";

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  displayedColumns: string[] = ['employeeid',
    'totalsickleaves',
    'totalauthorisedabsence',
    'totalmaternityleaves',
    'totalpaternityleaves',
    'totalrttadvleaves',
    'totalovertimeleaves',
    'totalunauthabsleaves',
    'totalforcedmajeureleaves',
    'totalotherleaves',
    'workingdays',
    'totalleaves'];

  allEmployeesTimeSheetReport: AllEmployeesTimeSheetReport[] = [];
  dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private leavesService: LeavesService) {

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchMonthlyReport(event){
    this.allEmployeesTimeSheetReport =[];
    this.dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
    let selectedDate = moment(event.value).format("DD-MM-YYYY");
    this.leavesService.fetchAllEmpLeavesMonthlyReport(selectedDate).subscribe(res => {

      if(res.validationMessage!=""){
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
          e.totalleaves));
      })
      this.dataSource = new MatTableDataSource<AllEmployeesTimeSheetReport>(this.allEmployeesTimeSheetReport);
      this.dataSource.paginator = this.paginator;
    });

  }

  ngOnInit(): void {

    console.log("String...")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    private totalleaves: number
  ) { }
}

