import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimesheetService } from 'src/app/services/timesheet.service';
import * as moment from 'moment';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL = '';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-fill-timesheet',
  templateUrl: './fill-timesheet.component.html',
  styleUrls: ['./fill-timesheet.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FillTimesheetComponent implements OnInit {
  user: any;
  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  timesheetHeader: any[] = [];
  timeSheetDetails: any;
  selectedDate = new Date();
  empId: any;
  timeSheetFlag: boolean = false;
  errorMessage: any;
  visible: boolean = false;
  selectedFiles?: FileList;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['xls', 'xlsx', 'pdf', 'odt', 'ods', 'odt'],
  });

  uploadqueue: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<FillTimesheetComponent>,
    private timesheetService: TimesheetService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data;
    this.empId = data.empId;
    console.log(' user ' + this.user);
  }

  ngOnInit(): void {
    this.fetchTimesheet();
  }

  //onclick toggling both
  onclick() {
    if (this.uploader.queue.length === 0) {
      this.visible = !this.visible;
    }
  }

  onFileSelected(filesdata) {
    const file: File = filesdata[0];
    this.selectedFiles = filesdata;
    console.log(file);
    console.log(this.selectedFiles);
    Object.keys(filesdata).forEach((element) => {
      this.uploadqueue.push(filesdata[element]);
    });
    console.log(this.uploadqueue);
  }

  save(value: any) {
    if (this.uploadqueue.length > 0) {
      const user: any = JSON.parse(localStorage.getItem('user') || '{}');

      for (let j = 0; j < this.uploader.queue.length; j++) {
        let data = new FormData();
        let fileItem = this.uploader.queue[j]._file;
        console.log(fileItem.name);
        data.append('file', fileItem);
        data.append('fileName', fileItem.name);
        data.append('empId', user.empId);
        data.append(
          'selectedTimeSheetDate',
          moment(this.selectedDate).format('DD-MM-YYYY')
        );

        this.timesheetService.uploadMultiple(data).subscribe((data) => {
          console.log(' file uploaded..');
        });
      }
    }
  }

  /*chosenYearHandler(normalizedYear: any) {
    const ctrlValue = this.date.value;
    ctrlValue?.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.date.value;
    ctrlValue?.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }*/

  updateTimeSheet() {
    let user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.timeSheetDetails.timeSheetRow = this.rows;
    this.timeSheetDetails.updatedBy = user.empId;

    this.timesheetService
      .updateTimeSheet(this.timeSheetDetails)
      .subscribe((data) => {
        console.log(' timesheet updated ');
      });
  }

  calculateHours(data: any) {
    this.rows.forEach((element) => {
      let contList: any = element.contractTimeSheetList;
      let totalHours = 0;
      contList.forEach((num: any) => {
        if (this.checkNumber(num)) {
          totalHours = totalHours + +num.filledData;
        } else if (num.filledData && num.filledData === 'HL') {
          totalHours = totalHours + 4;
        }
      });
      element.noOfHrs = totalHours;
    });
  }

  checkNumber(num: any) {
    return (
      (typeof num.filledData === 'number' ||
        (typeof num.filledData === 'string' && num.filledData.trim() !== '')) &&
      !isNaN(num.filledData as number)
    );
  }

  close() {
    this.dialogRef.close();
  }

  fetchTimesheet(): void {
    this.timeSheetFlag = false;
    this.errorMessage = '';
    let currMonth = new Date().getMonth();

    var check = moment(this.selectedDate, 'YYYY/MM/DD');
    var month = check.format('M');
    if (Number(month) > currMonth + 1) {
      this.errorMessage =
        'Its too early to submit the timesheet, contact your HR';
    }
    if (this.empId) {
      this.timesheetService
        .fetchTimeSheet(
          this.empId,
          moment(this.selectedDate).format('DD-MM-YYYY')
        )
        .subscribe((data) => {
          this.timeSheetFlag = data.timeSheetFlag;
          this.timeSheetDetails = data;
          this.header = data.timeSheetHeader;
          this.timesheetHeader = data.timeSheetHeader;
          this.rows = data.timeSheetRow;
        });
    }
  }
}

interface Timesheet {
  contractId: string;
  comments: string;
  noOfHrs: string;
  contractTimeSheetList: {
    day: string;
    dayName: string;
    isDisabled: boolean;
    filledData: string;
  };
}
