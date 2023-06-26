import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
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
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class YearlyEmpReportComponent implements OnInit {
  employeeName: any[] = [];
  successFlag = false;
  empName: any;
  yearlyReport: any;
  date = new UntypedFormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  displayedColumns: string[] = [
    'month',
    'nishContractId',
    'actualWorkingDays',
    'daysWorked',
    'billingRate',
    'amount',
    'marginPerMonth',
  ];

  monthlyRevenue: MonthlyReport[] = [];
  dataSource = new MatTableDataSource<MonthlyReport>(this.monthlyRevenue);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: UntypedFormBuilder,
    private timesheetService: TimesheetService
  ) {}

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchMonthlyReport(event) {
    console.log('String...');
    this.monthlyRevenue = [];
    let selectedDate = moment(event.value).format('YYYY');
    this.timesheetService
      .generateEmpRevenueReport(this.empName, selectedDate)
      .subscribe((res: any) => {
        this.yearlyReport = res;
        console.log(res);
        this.yearlyReport.monthRevenueReportList.forEach((e) => {
          this.monthlyRevenue.push(
            new MonthlyReport(
              e.month,
              e.nishContractId,
              e.actualWorkingDays,
              e.daysWorked,
              e.billingRate,
              e.amount,
              e.marginPerMonth
            )
          );
        });

        this.employeeYearlyReport.patchValue({
          salPerMonth: res.grossPerMonth,
          employeeCTC: res.empCTC,
          totalRevenueGenerated: res.totalBillingTillNow,
          totalEmpExpenses: res.totalRevenePercentage,
        });

        this.dataSource = new MatTableDataSource<MonthlyReport>(
          this.monthlyRevenue
        );
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnInit(): void {
    console.log('String...');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  employeeYearlyReport = this.fb.group({
    salPerMonth: [''],
    employeeCTC: [''],
    numberOfCarMonth: [''],
    carExpenditure: [''],
    totalRevenueGenerated: [],
    totalEmpExpenses: [],
  });
}

export class MonthlyReport {
  constructor(
    private month: string,
    private nishContractId: string,
    private actualWorkingDays: number,
    private daysWorked: number,
    private billingRate: number,
    private amount: number,
    private marginPerMonth: number
  ) {}
}
