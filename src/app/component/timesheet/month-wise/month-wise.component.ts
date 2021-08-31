import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {leaveClassNameType} from '../../../constants/leaveClassNameType';
import {TimesheetService} from "../../../services/timesheet.service";

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
export class MonthWiseComponent implements OnInit {
  hasError = false;
  global;
  date = moment();
  calendar: Array<CalendarItem[]> = [];
  employeeData: any = null;
  monthlyForm: FormGroup;
  validPattern = '^[a-zA-Z0-9]+$';
  leaveList = leaveClassNameType;

  constructor(public fb: FormBuilder, private service: TimesheetService) {
    this.monthlyForm = this.fb.group({
      employeeNumber: new FormControl('', [Validators.required, Validators.pattern(this.validPattern)])
    });
  }

  get f() {
    return this.monthlyForm.controls;
  }

  ngOnInit(): void {
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
    this.getMonthlyTimesheet(this.f.employeeNumber.value, this.date);
  }

  public previousMonth() {
    this.date.subtract(1, 'months');
    this.getMonthlyTimesheet(this.f.employeeNumber.value, this.date);
  }

  getMonthlyTimesheet(employeeNumber: any, moment: moment.Moment) {
    this.employeeData = null;
    this.hasError = false;
    const url = '../assets/json/monthly_' + employeeNumber + '.json';
    this.service.fetchMonthlyTimesheet(employeeNumber, moment.format('MMMM ')).subscribe(
      data => {
        this.date = moment;
        this.employeeData = data;
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
      if (montlyJson[a].includes(date)) {
        leave = {
          className: a,
          data: this.leaveList
            .filter(obj => obj.key === a)
            .map(obj => obj.code)[0]
        };
      }
    });
    return leave;
  }
}
