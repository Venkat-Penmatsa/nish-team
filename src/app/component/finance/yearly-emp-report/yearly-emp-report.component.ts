import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeavesService } from 'src/app/services/leaves.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { TimesheetService } from 'src/app/services/timesheet.service';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-yearly-emp-report',
  templateUrl: './yearly-emp-report.component.html',
  styleUrls: ['./yearly-emp-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class YearlyEmpReportComponent implements OnInit {

  employeeName: any[] = [];
  successFlag = false;
  empName: any;
  yearlyReport: any;
  date = new FormControl(moment());

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

  displayedColumns: string[] = ['leavemonth','nishContractId','clientContractId',
    'totalworkingdays',
    'totalBillingdays',
    'totalleaves',
    'totalholidays',
    'billingrate',
    'actualbillpermonth'];

  monthlyRevenue: MonthlyReport[] = [];
  dataSource = new MatTableDataSource<MonthlyReport>(this.monthlyRevenue);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private fb: FormBuilder, private timesheetService: TimesheetService) {

  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchMonthlyReport(event) {

    console.log("String...");
    this.monthlyRevenue = [];
    let selectedDate = moment(event.value).format("YYYY");
    this.timesheetService.generateEmpRevenueReport(this.empName, selectedDate).subscribe(res => {
      this.yearlyReport = res;
      console.log(res);
      this.yearlyReport.employeeMonthlyRevenue.forEach(e => {
        this.monthlyRevenue.push(new MonthlyReport(e.leavemonth,
          e.leaveyear,
          e.nishContractId,
          e.clientContractId,
          e.totalworkingdays,
          e.totalBillingdays,
          e.totalleaves,
          e.totalholidays,
          e.billingrate,
          e.exceptedbillpermonth,
          e.actualbillpermonth));
      })

      this.employeeYearlyReport.patchValue({
        totalExpectedRevenue:  this.yearlyReport.totalExpectedRevenue,
        totalGeneratedRevenue:  this.yearlyReport.totalGeneratedRevenue,
        expensesPerMonth: this.yearlyReport.expensesPerMonth,
        empYearlyExpenses:  this.yearlyReport.empYearlyExpenses,
        totalExpOnEmp: this.yearlyReport.totalExpOnEmp,
        margin:this.yearlyReport.margin,
      });
      
      this.dataSource = new MatTableDataSource<MonthlyReport>(this.monthlyRevenue);
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

  employeeYearlyReport = this.fb.group({
    totalExpectedRevenue: ['',],
    totalGeneratedRevenue: ['',],
    expensesPerMonth: [''],
    empYearlyExpenses: [''],
    totalExpOnEmp:[],
    margin:[]
  });

}


export class MonthlyReport {
  constructor(
    private leavemonth: number,
    private leaveyear: number,
    private nishContractId: number,
    private clientContractId: number,
    private totalworkingdays: number,
    private totalBillingdays: number,
    private totalleaves: number,
    private totalholidays: number,
    private billingrate: number,
    private exceptedbillpermonth: number,
    private actualbillpermonth: number
  ) { }
}
