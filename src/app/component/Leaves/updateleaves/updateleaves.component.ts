import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { AssetsType } from 'src/app/constants/assetsType';
import { map, startWith } from 'rxjs/operators';
import { AssetsService } from 'src/app/services/assets.service';
import { LeavesService } from 'src/app/services/leaves.service';
import { User } from 'src/app/model/User';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';
import { Moment } from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-updateleaves',
  templateUrl: './updateleaves.component.html',
  styleUrls: ['./updateleaves.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
  ]
})
export class UpdateleavesComponent implements OnInit {

  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment, dp: any) {
    let ctrlValue: any = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    dp.close();
    console.log(this.date.value, ctrlValue);
    this.fetchLeaves();
  }

  selectUpdateCategory: string;
  employeeName: any[] = [];
  filterEmpName: string;
  disableBtn = false;
  successFlag = false;
  empName: any;
  user:User;
  selectYear: any;
  dateForm = new FormControl();

  constructor(private fb: UntypedFormBuilder, private leavesService: LeavesService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userDetails")|| '{}') as User;
  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }


  fetchLeaves() {
    this.successFlag = false;
    if (this.empName != "") {
      this.updateLeavesForm.reset();
      this.leavesService.fetchEmpLeaves(this.empName, moment(this.date.value).format('YYYY')).subscribe(res => {
        console.log("data ==========> " + res);

        this.updateLeavesForm.patchValue({
          leavebalenceid: res.leavebalenceid,
          employeeId: res.employeeId,
          rttAdv: res.rttAdv,
          authorisedAbsence: res.authorisedAbsence,
          other: res.other,
          compensationLeave: res.compensationLeave,
          forwardedLeave: res.forwardedLeave,
          totalleavebalence: res.totalleavebalence,
          advanceLeaves: res.advanceLeaves,
          updatedBy: res.updatedBy,
          comments: res.comments
        });
      })
    }
  }

  UpdateLeaves() {
    this.successFlag = false;
    console.log(this.updateLeavesForm.value);
    this.updateLeavesForm.patchValue({
      updatedBy: this.user.empId,
      employeeId: this.empName
    })
    const assetJson = JSON.stringify(this.updateLeavesForm.value);
    console.log('assetJson ' + assetJson);

    this.leavesService.updateEmpLeaves(assetJson)
      .subscribe(data => {
        console.log("data ==========> " + data);
        let serviceResponse = data;
        this.successFlag = true;
      })
  }

  updateLeavesForm = this.fb.group({
    leavebalenceid: ['', Validators.required],
    employeeId: ['', Validators.required],
    rttAdv: ['',Validators.required],
    authorisedAbsence: ['',Validators.required],
    other: ['',],
    compensationLeave: ['',],
    forwardedLeave: ['',],
    totalleavebalence: ['',],
    advanceLeaves: ['',],
    updatedBy: ['',],
    comments: []
  });

}
