import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import moment from 'moment';
import { Moment } from 'moment';
import { User } from 'src/app/model/User';
import { LeavesService } from 'src/app/services/leaves.service';
import { LoaderService } from 'src/app/services/loader.service';
import {
  leaveBalence,
  leaveClassNameType,
} from '../../../constants/leaveClassNameType';
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

export const YEAR_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: YEAR_FORMATS,
    },
  ],
})
export class ApplyleaveComponent implements OnInit {
  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment, dp: any) {
    let ctrlValue: any = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    dp.close();
    console.log(this.date.value, ctrlValue);
    this.fetchLeaveBalence();
  }

  leaveList = leaveBalence;
  filterEmpName: string;
  empName: any;
  showleaves = false;
  hasError = false;
  selectedStartDate: Date;
  selectedEndDate: Date;
  startDate = new Date();
  message = false;
  messageDesc = '';
  error = false;
  errorDesc = '';
  user: User;
  halfDay: boolean = false;
  sickLeaveNoCert: boolean = false;
  leaveStartDate = moment();
  leaveEndDate = moment();
  loading$: any;
  selectYear: any;
  dateForm = new FormControl();

  constructor(
    private fb: UntypedFormBuilder,
    private leavesService: LeavesService,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {
    console.log('this.loading$...' + this.loading$);
    this.loading$ = this.loader.loading$;
  }

  dateFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  };

  empNameSelected(emp: any) {
    this.empName = emp;
    this.fetchLeaveBalence();
  }

  fetchLeaveBalence() {
    console.log('data ==========> ' + this.date.value);

    this.leavesService
      .fetchEmpLeaves(this.empName, moment(this.date.value).format('YYYY'))
      .subscribe((res) => {
        console.log('data ==========> ' + res);
        const keys = Object.keys(res);

        this.leaveList.forEach((leave) => {
          leave.value = res[leave.key];
        });
        this.showleaves = true;
      });

    console.log('data ==========> ' + this.leaveList);
  }

  dateValidation(event) {
    console.log(event);
    const m: Moment = event.value;

    this.selectedStartDate = this.leaveForm.value.leaveStartDate;
    this.selectedEndDate = this.leaveForm.value.leaveEndDate;

    if (this.selectedStartDate && this.selectedEndDate) {
      this.leaveStartDate = this.leaveForm.value.leaveStartDate;
      this.leaveEndDate = this.leaveForm.value.leaveEndDate;

      let startDate = moment(this.leaveForm.value.leaveStartDate).format(
        'DD-MM-YYYY'
      );
      let endDate = moment(this.leaveForm.value.leaveEndDate).format(
        'DD-MM-YYYY'
      );

      this.leavesService
        .calculateLeaves(startDate, endDate)
        .subscribe((res) => {
          console.log('data ==========> ' + res.numberOfDays);
          this.leaveForm.patchValue({ numberOfDays: res.numberOfDays });
        });
    }
  }

  submitLeave() {
    this.message = false;
    this.error = false;
    let validation = true;
    if (this.leaveForm.valid) {
      const leaveType = this.leaveForm.value.leaveType;
      this.leaveList.forEach((leave) => {
        if (leaveType !== 'SL' && leave.code === leaveType) {
          const numberOfDays = leave.value;
          if (this.leaveForm.value.numberOfDays > numberOfDays) {
            this.error = true;
            this.errorDesc =
              'Employee does not have enough leave balence for the selected Leave Type.';
            validation = false;
            return;
          }
        }
      });
      if (validation) {
        this.user = JSON.parse(
          localStorage.getItem('userDetails') || '{}'
        ) as User;
        const applyLeave = {
          employeeId: this.empName,
          leaveType: this.leaveForm.value.leaveType,
          startDate: moment(this.leaveForm.value.leaveStartDate).format(
            'DD-MM-YYYY'
          ),
          endDate: moment(this.leaveForm.controls['leaveEndDate'].value).format(
            'DD-MM-YYYY'
          ),
          leaveAppliedBy: this.user.empId,
          halfDay: this.halfDay,
          sickLevWOCert: this.sickLeaveNoCert,
          numberOfDays: this.leaveForm.value.numberOfDays,
          comments: this.leaveForm.value.comments,
        };
        const leavesjson = JSON.stringify(applyLeave);
        this.leavesService.applyLeaves(leavesjson).subscribe((res) => {
          console.log(res);

          if (res.responseStatus == 'failed') {
            this.error = true;
            this.errorDesc = res.errorDescription;
          }
          if (res.leaveId != null) {
            this.message = true;
            this.messageDesc = 'Leave applied successfully';
            this.fetchLeaveBalence();
            this.leaveForm.reset();
          }
        });
      }
    } else {
      this.hasError = true;
    }
  }

  disableEndDate(status: any) {
    console.log(status);
    if (status) {
      this.leaveForm.patchValue({
        leaveEndDate: this.leaveForm.value.leaveStartDate,
      });
      this.leaveForm.controls['leaveEndDate'].disable();
      this.leaveForm.patchValue({ numberOfDays: 0.5 });
      this.halfDay = true;
    } else {
      this.leaveForm.patchValue({ leaveEndDate: '' });
      this.leaveForm.patchValue({ numberOfDays: '' });
      this.leaveForm.controls['leaveEndDate'].enable();
      this.halfDay = false;
    }
  }

  checkSickLeaves(status: any) {
    if (status) {
      this.sickLeaveNoCert = true;
    } else {
      this.sickLeaveNoCert = false;
    }
    console.log('Sick leaves status : ', this.sickLeaveNoCert);
  }

  get f() {
    return this.leaveForm.controls;
  }

  leaveForm = this.fb.group({
    leaveType: ['', Validators.required],
    leaveStartDate: ['', Validators.required],
    leaveEndDate: ['', Validators.required],
    numberOfDays: [''],
    halfDay: [''],
    sickLeaveNoCert: [''],
    comments: [''],
  });
}
