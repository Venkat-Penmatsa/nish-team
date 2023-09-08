import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { MonthlyReport } from '../yearly-emp-report/yearly-emp-report.component';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

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
  selector: 'app-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.css'],
})
export class RevenueReportComponent implements OnInit {
  public yearlyEmpsRevenueReport!: YearlyEmpsRevenueReport[];
  constructor(private timesheetService: TimesheetService) {}
  totalCtc;
  totalCompanyRevenue;
  reveneYetToGenerate;

  ngOnInit(): void {
    //this.yearlyEmpsRevenueReport = EmployeelistData;
  }

  generateReport(event) {
    let selectedDate = moment(event.value).format('YYYY');
    this.timesheetService
      .generateYearlyRevenueReport(selectedDate)
      .subscribe((res: any) => {
        this.yearlyEmpsRevenueReport = res.yearlyEmpsRevenueReportList;
        this.totalCtc = res.totalCtc;
        this.totalCompanyRevenue = res.totalCompanyRevenue;
        this.reveneYetToGenerate = res.reveneYetToGenerate;
      });
  }

  removeItem(itemId: any) {}
}

interface YearlyEmpsRevenueReport {
  empName?: string;
  totalRevenueGenerated?: string;
  ctc?: string;
  diff?: string;
}
