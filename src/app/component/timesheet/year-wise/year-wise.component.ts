import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {leaveClassNameType} from "../../../constants/leaveClassNameType";
import {TimesheetService} from "../../../services/timesheet.service";

interface YearlyCalendarItem {
  day: string;
  className: string;
  isWeekend: boolean;
  employeeData: string;
  isValidDate: boolean;
  monthName: string;
}

@Component({
  selector: 'app-year-wise',
  templateUrl: './year-wise.component.html',
  styleUrls: ['./year-wise.component.css']
})
export class YearWiseComponent implements OnInit {
  hasError = false;
  date = moment();
  calendar: Array<YearlyCalendarItem[]> = [];
  employeeData: any = null;
  global;
  yearlyForm: FormGroup;
  validPattern = '^[a-zA-Z0-9]+$';
  leaveList = leaveClassNameType;

  constructor(private service: TimesheetService, public fb: FormBuilder) {
    this.yearlyForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(this.validPattern)])});
  }

  get f() { return this.yearlyForm.controls; }

  ngOnInit(): void {
  }


  createCalendar(year: moment.Moment) {
    const calendar: YearlyCalendarItem[] = [];
    const currentMonth = this.date.get('months');
    const startMonth = this.date.subtract(currentMonth, 'months');
    for (let i = 0; i < 12; i++) {
      let i = 0;
      const daysInMonth = startMonth.daysInMonth();
      const startOfMonth = startMonth.startOf('months').format('ddd');
      const endOfMonth = startMonth.endOf('months').format('ddd');
      const weekdaysShort = moment.weekdaysShort();

      const daysBefore = weekdaysShort.indexOf(startOfMonth);
      const daysAfter = weekdaysShort.length - 1 - weekdaysShort.indexOf(endOfMonth);

      const clone = startMonth.startOf('months').clone();

      for (; i < daysInMonth; i++) {
        calendar.push(this.createCalendarItem(clone, 'in-month'));
        clone.add(1, 'days');
      }
      while (i < 31) {
        clone.subtract(1, 'days');
        calendar.push(this.createCalendarItem(clone, 'invalidDate'));
        clone.add(1, 'days');
        i++;
      }
      if (this.date.month() !== 11){
        this.date.add(1, 'months');
      }
    }
    this.calendar = calendar.reduce((pre: Array<YearlyCalendarItem[]>, curr: YearlyCalendarItem) => {
      if (pre[pre.length - 1][0] !== undefined && pre[pre.length - 1][0].monthName === curr.monthName) {
        pre[pre.length - 1].push(curr);
      } else {
        pre.push([curr]);
      }
      return pre;
    }, [[]]);
    return this.calendar;
  }

  createCalendarItem(data: moment.Moment, className: string) {
    const dayName = data.format('ddd');
    const month =  data.format('MMM').toLowerCase();
    const monthlyData = this.employeeData[month];
    const employeeData = this.getEmployeeData(data, monthlyData);
    return {
      day: className === 'in-month' ? data.format('DD') : '',
      isWeekend: dayName === 'Sun' || dayName === 'Sat',
      isValidDate: className === 'in-month',
      monthName: data.format('MMM'),
      employeeData:  employeeData.data,
      className: employeeData.className !== '' ? employeeData.className : className,
    };
  }

  public nextMonth() {
    this.date.add(1, 'years');
    this.getYearlyTimesheet(this.f.name.value, this.date);
  }

  public previousMonth() {
    this.date.subtract(1, 'years');
    this.getYearlyTimesheet(this.f.name.value, this.date);
  }

  private getEmployeeData(data: moment.Moment, json: any) {
    let leave = {
      className: '',
      data: ''
    };
    const date = data.format('DD-MM-YYYY');
    if (json !== undefined){
      const keys = Object.keys(json);
      keys.forEach(a => {
        if (json[a].includes(date)) {
          leave = {
            className: a,
            data: this.leaveList
            .filter(obj => obj.key === a)
            .map(obj => obj.code)[0]
          };
        }
      });
    }

    return leave;
  }

  getYearlyTimesheet(employeeNumber: any, moment: moment.Moment){
    this.employeeData = null;
    this.hasError = false;
    this.service.fetchYearlyTimesheet(employeeNumber, moment.format('YYYY')).subscribe(
      data => {
        this.date = moment;
        this.employeeData = data;
        this.calendar = this.createCalendar(this.date);
      }, error => {
        this.hasError = true;
      }
    );
  }

}
