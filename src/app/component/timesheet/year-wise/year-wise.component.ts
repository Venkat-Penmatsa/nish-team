import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { leaveClassNameType } from "../../../constants/leaveClassNameType";
import { TimesheetService } from "../../../services/timesheet.service";
import {saveAs as importedSaveAs} from "file-saver";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { LoaderService } from 'src/app/services/loader.service';

interface YearlyCalendarItem {
  day: string;
  className: string;
  isWeekend: boolean;
  employeeData: string;
  isValidDate: boolean;
  monthName: string;
}

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-year-wise',
  templateUrl: './year-wise.component.html',
  styleUrls: ['./year-wise.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class YearWiseComponent implements OnInit, OnChanges {
  hasError = false;
  date = moment();
  calendar: Array<YearlyCalendarItem[]> = [];
  employeeData: any = null;
  global;
  yearlyForm: FormGroup;
  validPattern = '^[a-zA-Z0-9]+$';
  leaveList = leaveClassNameType;
  rttLeaves: string;
  authLeaves: string;
  otherLeaves: string;
  selectedY = new FormControl();
  empName: any;
  filterEmpName: string;
  loading$:any;
  
  constructor(private service: TimesheetService, public fb: FormBuilder, private loader: LoaderService) {
    this.yearlyForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(this.validPattern)])
    });
  }

  get f() { return this.yearlyForm.controls; }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading$ = this.loader.loading$;
 }

  empNameSelected(emp: any) {
    this.empName = emp;
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
      if (this.date.month() !== 11) {
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
    /*const month =  data.format('MMM').toLowerCase();
    const monthlyData = this.employeeData[month];*/
    const employeeData = this.getEmployeeData(data, this.employeeData);
    return {
      day: className === 'in-month' ? data.format('DD') : '',
      isWeekend: dayName === 'Sun' || dayName === 'Sat',
      isValidDate: className === 'in-month',
      monthName: data.format('MMM'),
      employeeData: employeeData.data,
      className: employeeData.className !== '' ? employeeData.className : className,
    };
  }

  public nextMonth() {
    this.date.add(1, 'years');
    this.getYearlyTimesheet(this.date);
  }

  public previousMonth() {
    this.date.subtract(1, 'years');
    this.getYearlyTimesheet(this.date);
  }

  private getEmployeeData(data: moment.Moment, json: any) {
    let leave = {
      className: '',
      data: ''
    };
    const date = data.format('DD-MM-YYYY');
    if (json !== undefined) {
      const keys = Object.keys(json);
      keys.forEach(a => {
        if (json[a] !== null && json[a].length > 0 && json[a].includes(date)) {
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

  getYearlyTimesheet(moment: moment.Moment) {
    console.log("test");
    let selectedEmp = this.empName.split('-');
    this.employeeData = null;
    this.hasError = false;
    this.service.fetchYearlyTimesheet(selectedEmp[0], _moment(this.selectedY.value).format('YYYY')).subscribe(
      (data: any) => {
        this.date = moment;
        this.employeeData = data;
        this.rttLeaves = data.rttAdvLeaves;
        this.authLeaves = data.authLeaves;
        this.otherLeaves = data.otherLeaves;
        this.calendar = this.createCalendar(this.date);
      }, error => {
        this.hasError = true;
      }
    );
  }

  downloadYearlyTimesheet(moment: moment.Moment) {

    let selectedEmp = this.empName.split('-');
    this.employeeData = null;
    this.hasError = false;
    this.service.downloadYearlyTimesheet(selectedEmp[0], _moment(this.selectedY.value).format('YYYY')).subscribe(res => {
      console.log(res);
      //window.open(res);

      let blob:any = new Blob([res], { type: 'text/json; charset=utf-8' });
      importedSaveAs(blob, selectedEmp+'-LeavesReport.pdf');

    }, error => {
        this.hasError = true;
      }
    );
  }

}
