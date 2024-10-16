import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { User } from 'src/app/model/User';
import { EmployeeService } from 'src/app/services/employee.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { LoaderService } from 'src/app/services/loader.service';
const moment = _moment;

@Component({
  selector: 'app-employee-exit',
  templateUrl: './employee-exit.component.html',
  styleUrls: ['./employee-exit.component.css'],
})
export class EmployeeExitComponent implements OnInit {
  nishContractId: number;
  successFlag: Boolean = false;
  errorFlag: Boolean = false;
  errorDescription: any;
  user: User;
  loading$: any;
  davChecked: boolean = false;
  simChecked: boolean = false;

  assetList: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    public employService: EmployeeService,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {}

  dateOfJoiningFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  };

  searchEmployeeId($event: Event) {
    this.successFlag = false;
    const employeeId = ($event.target as HTMLTextAreaElement).value;

    if (employeeId != '') {
      this.employService.getEmployeeExitDetails(employeeId).subscribe((res) => {
        console.log(res);
        this.empExitForm.patchValue({
          employeeId: res.employeeId,
          onboardingStatus: res.onboardingStatus,
          noticeType: res.noticeType,
          endOfContract: res.endOfContract,
          sim: res.sim,
          dav: res.dav,
          comments: res.comments,
        });
        if (res.noticeStartDate != null) {
          this.empExitForm.patchValue({
            noticeStartDate: new Date(res.noticeStartDate),
          });
        }
        if (res.noticeLastDate != null) {
          this.empExitForm.patchValue({
            noticeLastDate: new Date(res.noticeLastDate),
          });
        }
        this.assetList = res.assetDetails;
      });
    }
  }

  onSubmit() {
    this.errorFlag = false;
    this.successFlag = false;

    this.user = JSON.parse(localStorage.getItem('userDetails') || '{}') as User;
    const body = JSON.stringify(this.empExitForm.getRawValue());

    console.log('leaves jason' + body);

    this.employService.updateEmployeeExit(body).subscribe((data) => {
      console.log('data ==========> ' + data);

      if (data.status == 'Failure') {
        this.errorFlag = true;
        this.errorDescription = data.errorDescription;
      } else {
        this.successFlag = true;
      }
    });
  }

  empExitForm = this.fb.group({
    employeeId: ['', Validators.required],
    onboardingStatus: ['', Validators.required],
    noticeStartDate: ['', Validators.required],
    noticeLastDate: ['', Validators.required],
    noticeType: ['', Validators.required],
    endOfContract: ['', Validators.required],
    comments: [''],
    sim: [''],
    dav: [''],
    updatedBy: [''],
  });
}
