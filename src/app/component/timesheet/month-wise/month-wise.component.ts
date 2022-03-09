import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { leaveClassNameType } from '../../../constants/leaveClassNameType';
import { TimesheetService } from "../../../services/timesheet.service";
import { LoaderService } from 'src/app/services/loader.service';

interface CalendarItem {
  day: string;
  dayName: string;
  className: string;
  isWeekend: boolean;
  employeeData: string;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
}

@Component({
  selector: 'app-month-wise',
  templateUrl: './month-wise.component.html',
  styleUrls: ['./month-wise.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MonthWiseComponent implements OnInit,OnChanges {
  hasError = false;
  global;
  date = moment();
  calendar: Array<CalendarItem[]> = [];
  employeeData: any = null;
  monthlyForm: FormGroup;
  validPattern = '^[a-zA-Z0-9]+$';
  leaveList = leaveClassNameType;
  numberOfWorkingDays;
  numberOfLeaves;
  numberOfDaysWorked;
  empName: any;
  filterEmpName: string;
  loading$:any;

  constructor(public fb: FormBuilder, private service: TimesheetService, private loader: LoaderService) {
    this.monthlyForm = this.fb.group({
      employeeNumber: new FormControl('', [Validators.required, Validators.pattern(this.validPattern)])
    });
  }

  get f() {
    return this.monthlyForm.controls;
  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading$ = this.loader.loading$;
 }

  createCalendar(month: moment.Moment) {
    const daysInMonth = month.daysInMonth();
    const startOfMonth = month.startOf('months').format('ddd');
    const endOfMonth = month.endOf('months').format('ddd');
    const weekdaysShort = moment.weekdaysShort();
    const calendar: CalendarItem[] = [];

    const daysBefore = weekdaysShort.indexOf(startOfMonth);
    const daysAfter = weekdaysShort.length - 1 - weekdaysShort.indexOf(endOfMonth);

    const clone = month.startOf('months').clone();
    if (daysBefore > 0) {
      clone.subtract(daysBefore, 'days');
    }

    for (let i = 0; i < daysBefore; i++) {
      calendar.push(this.createCalendarItem(clone, 'previous-month'));
      clone.add(1, 'days');
    }

    for (let i = 0; i < daysInMonth; i++) {
      calendar.push(this.createCalendarItem(clone, 'in-month'));
      clone.add(1, 'days');
    }

    for (let i = 0; i < daysAfter; i++) {
      calendar.push(this.createCalendarItem(clone, 'next-month'));
      clone.add(1, 'days');
    }


    return calendar.reduce((pre: Array<CalendarItem[]>, curr: CalendarItem) => {
      if (pre[pre.length - 1].length < weekdaysShort.length) {
        pre[pre.length - 1].push(curr);
      } else {
        pre.push([curr]);
      }
      return pre;
    }, [[]]);
  }

  createCalendarItem(data: moment.Moment, className: string) {
    const dayName = data.format('ddd');
    const employeeData = this.getEmployeeData(data, this.employeeData);
    return {
      day: className === 'in-month' ? data.format('DD') : '',
      dayName,
      className: employeeData.className !== '' ? employeeData.className : className,
      employeeData: employeeData.data,
      isWeekend: dayName === 'Sun' || dayName === 'Sat',
      isPreviousMonth: className === 'previous-month',
      isNextMonth: className === 'next-month'
    };
  }

  public nextMonth() {
    this.date.add(1, 'months');
    this.getMonthlyTimesheet(this.date);
  }

  public previousMonth() {
    this.date.subtract(1, 'months');
    this.getMonthlyTimesheet(this.date);
  }

  getMonthlyTimesheet( moment: moment.Moment) {
    console.log('moment ' + moment);
    this.employeeData = null;
    this.hasError = false;
    let selectedEmp = this.empName.split('-');
    const url = '../assets/json/monthly_' + selectedEmp[0] + '.json';
    //this.service.fetchMonthlyTimesheet(employeeNumber, moment.format('MMMM ')).subscribe(
    this.service.fetchMonthlyTimesheet(selectedEmp[0], moment.format("DD-MM-yyyy")).subscribe(
      data => {
        this.date = moment;
        this.employeeData = data;
        this.numberOfWorkingDays = this.employeeData.numberOfWorkingDays;
        this.numberOfLeaves=this.employeeData.numberOfLeaves;
        this.numberOfDaysWorked=this.employeeData.numberOfDaysWorked;
        this.calendar = this.createCalendar(this.date);
      }, error => {
        this.hasError = true;
      }
    );
  }

  private getEmployeeData(data: moment.Moment, montlyJson: any) {
    let leave = {
      className: '',
      data: ''
    };
    const date = data.format('DD-MM-YYYY');
    const keys = Object.keys(montlyJson);
    keys.forEach(a => {
      if (a != "numberOfWorkingDays" && a != "numberOfLeaves"
        && a != "numberOfDaysWorked" && a != "numberOfCompDays" && !(montlyJson[a] >= 0)) {
          console.log("montlyJson[a]  " + montlyJson[a]);
        if (montlyJson[a].includes(date)) {
          leave = {
            className: a,
            data: this.leaveList
              .filter(obj => obj.key === a)
              .map(obj => obj.code)[0]
          };
        }
      }
    });
    return leave;
  }
}
