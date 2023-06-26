import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/User';
import { TimesheetService } from 'src/app/services/timesheet.service';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

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
  selector: 'app-employee-offer',
  templateUrl: './employee-offer.component.html',
  styleUrls: ['./employee-offer.component.css'],
})
export class EmployeeOfferComponent implements OnInit {
  employeeName: any[] = [];
  disableBtn = false;
  empExpenses: any;
  successFlag = false;
  empName: any;
  user: User;
  selectedDate = new Date();
  totalExpPerMOnth: number;
  totalYearExpenses: number;
  transportOption: any;
  date = new UntypedFormControl(moment());

  constructor(
    private fb: UntypedFormBuilder,
    private timesheetService: TimesheetService
  ) {}

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  ngOnInit(): void {}

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  fetchEmpExpenses(event) {
    let selectedDate = moment(event.value).format('YYYY');
    this.timesheetService
      .fetchEmployeeExpenses(this.empName, selectedDate)
      .subscribe((data) => {
        console.log('emp expenses ' + data);
        this.empExpenses = data;
        this.employeeExpenses.patchValue({
          grossPerMonth: this.empExpenses.grossPerMonth,
          grossTax: this.empExpenses.grossTax,
          totalYearExpenses: this.empExpenses.totalYearExpenses,
          grossPerYear: this.empExpenses.grossPerYear,
          rest: this.empExpenses.rest,
          ctc: this.empExpenses.ctc,
          totalExpPerMOnth: this.empExpenses.totalExpPerMOnth,
          comments: this.empExpenses.comments,
          empExpId: this.empExpenses.empExpId,
          sal: this.empExpenses.sal,
          generalExpenses: this.empExpenses.generalExpenses,
          yearExpenses: this.empExpenses.yearExpenses,
          transport: this.empExpenses.transport,
        });
      });
  }

  calculateExpenses() {
    let transport = 0;

    if (this.transportOption != null && this.transportOption != '') {
      if (this.transportOption == 'Car') {
        const car = this.employeeExpenses.controls['transport'].value.car;
        const fuelCard =
          this.employeeExpenses.controls['transport'].value.fuelCard;
        const carInsurance =
          this.employeeExpenses.controls['transport'].value.carInsurance;
        transport = car + fuelCard + carInsurance;
      } else if (this.transportOption == 'Mobility') {
        transport = this.employeeExpenses.controls['transport'].value.mobility;
      }
    }

    const grossSal = this.employeeExpenses.controls['sal'].value.grossSal;
    const mobile =
      this.employeeExpenses.controls['generalExpenses'].value.mobile;
    const sdworksFee =
      this.employeeExpenses.controls['generalExpenses'].value.sdworksFee;
    const sodexoFee =
      this.employeeExpenses.controls['generalExpenses'].value.sodexoFee;
    const dkvinsurance =
      this.employeeExpenses.controls['generalExpenses'].value.dkvinsurance;
    const othersGeneralExp =
      this.employeeExpenses.controls['generalExpenses'].value.othersGeneralExp;

    this.totalExpPerMOnth =
      grossSal +
      mobile +
      sdworksFee +
      sodexoFee +
      dkvinsurance +
      othersGeneralExp;

    const YearExpenses =
      this.employeeExpenses.controls['yearExpenses'].value.ecoCoupons +
      this.employeeExpenses.controls['yearExpenses'].value.adminExp +
      this.employeeExpenses.controls['yearExpenses'].value.bonus +
      this.employeeExpenses.controls['yearExpenses'].value.otherYearExp;

    const grossPerMonth = this.employeeExpenses.controls['sal'].value.grossSal;
    const grossTax = (grossPerMonth * 33) / 100;
    const grossPerYear = (grossPerMonth + grossTax) * 13.92;
    const monthExpenses =
      mobile + sdworksFee + sodexoFee + dkvinsurance + othersGeneralExp;
    const rest = monthExpenses * 12 + transport;
    this.employeeExpenses.patchValue({
      grossPerMonth: grossPerMonth,
      grossTax: grossTax,
      totalYearExpenses: YearExpenses,
      grossPerYear: grossPerYear,
      rest: rest,
      ctc: grossPerYear + rest + YearExpenses,
    });
  }

  onSubmit() {
    this.user = JSON.parse(localStorage.getItem('userDetails') || '{}') as User;

    console.log(this.employeeExpenses.value);
    this.employeeExpenses.patchValue({
      emp: this.empName,
      updatedBy: this.user.empId,
      year: moment(this.selectedDate).format('YYYY'),
    });
    const salJson = JSON.stringify(this.employeeExpenses.value);
    console.log('salJson ' + salJson);

    this.timesheetService.updateEmployeeExpenses(salJson).subscribe((data) => {
      console.log('emp expenses ' + data);
      this.empExpenses = data;
      this.successFlag = true;
      /*this.employeeExpenses.patchValue({
        gross: this.empExpenses.totalExpPerMOnth,
        totalYearExpenses: this.empExpenses.totalYearExpenses,
        comments: this.empExpenses.comments,
        empExpId: this.empExpenses.empExpId,
        sal: this.empExpenses.sal,
        generalExpenses: this.empExpenses.generalExpenses,
        yearExpenses: this.empExpenses.yearExpenses,
      });*/
    });
  }

  employeeExpenses = this.fb.group({
    grossPerMonth: ['', Validators.required],
    year: [],
    totalYearExpenses: ['', Validators.required],
    comments: [''],
    grossTax: [''],
    grossPerYear: [''],
    rest: [''],
    ctc: [''],
    empExpId: [''],
    emp: [''],
    updatedBy: [''],
    sal: this.fb.group({
      grossSal: ['', Validators.required],
      netSal: ['', Validators.required],
      nsso: ['', Validators.required],
      advanceLevy: ['', Validators.required],
      sssContribution: ['', Validators.required],
      mealContribution: [],
      seasonTicketAllowance: ['', Validators.required],
      reimbursedExpenses: ['', Validators.required],
      othersal: ['', Validators.required],
    }),
    generalExpenses: this.fb.group({
      mobile: [50],
      sdworksFee: ['', Validators.required],
      sodexoFee: ['', Validators.required],
      dkvinsurance: [100],
      othersGeneralExp: ['', Validators.required],
    }),
    yearExpenses: this.fb.group({
      ecoCoupons: [250],
      adminExp: [100],
      bonus: [0],
      otherYearExp: [0],
    }),
    transport: this.fb.group({
      transportOption: [''],
      car: [800],
      fuelCard: [200],
      carInsurance: [200],
      mobility: [''],
    }),
  });
}
