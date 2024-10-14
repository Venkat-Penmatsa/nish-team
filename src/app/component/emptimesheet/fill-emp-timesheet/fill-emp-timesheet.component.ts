import { Component, inject, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { TimesheetService } from 'src/app/services/timesheet.service';
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { saveAs as importedSaveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fill-emp-timesheet',
  templateUrl: './fill-emp-timesheet.component.html',
  styleUrls: ['./fill-emp-timesheet.component.css'],
})
export class FillEmpTimesheetComponent implements OnInit {
  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  timesheetHeader: any[] = [];
  timeSheetDetails: any;
  selectedDate = new Date();
  filterEmpName: string;
  empName: any = undefined;
  dataLoaded: boolean = false;
  status: string = '';
  documentList: any;
  public file: File[];

  public fileUploadControl = new FileUploadControl({ listVisible: false });

  constructor(
    private timesheetService: TimesheetService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  calculateHours(data: any) {
    console.log(' data .........' + data);

    this.rows.forEach((element) => {
      let contList: any = element.contractTimeSheetList;
      let totalHours = 0;
      contList.forEach((num: any) => {
        if (this.checkNumber(num)) {
          totalHours = totalHours + +num.filledData;
        } else if (num.filledData != '' && num.filledData === 'HL') {
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

  updateTimeSheet() {
    this.status = '';
    let user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.timeSheetDetails.timeSheetRow = this.rows;
    this.timeSheetDetails.updatedBy = user.empId;

    this.timesheetService
      .updateTimeSheet(this.timeSheetDetails)
      .subscribe((data) => {
        this.status = data.responseStatus;
      });

    console.log(' rows........' + this.rows);
  }

  fetchTimesheet(): void {
    console.log(' fetching timesheet ' + this.empName);
    this.status = '';
    let user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.timesheetService
      .fetchTimeSheet(
        this.empName,
        moment(this.selectedDate).format('DD-MM-YYYY')
      )
      .subscribe((data) => {
        console.log('data ==========> ' + data);
        this.documentList = data.uploadedFilesList;
        this.timeSheetDetails = data;
        this.header = data.timeSheetHeader;
        this.timesheetHeader = data.timeSheetHeader;
        this.rows = data.timeSheetRow;
        console.log(' this.leaves .........' + data);
        this.dataLoaded = true;
      });
  }

  upload(): any {
    this.spinner.show();
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.file = this.fileUploadControl.value;

    let emp = this.empName.split('-');

    let data = new FormData();
    data.append('file', this.file[0]);
    data.append('fileName', this.file[0].name);
    data.append('empId', emp[0]);
    data.append(
      'selectedTimeSheetDate',
      moment(this.selectedDate).format('DD-MM-YYYY')
    );

    this.timesheetService.upload(data).subscribe((res: any) => {
      this.documentList = res.body.uploadedFilesList;
      this.spinner.hide();
      this.fileUploadControl.clear();
    });
  }

  downloadInvoice(contractId) {
    console.log('Downloading the invoice ');
    this.status = '';
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    let contract = contractId.split(' >>');
    let emp = this.empName.split('-');
    let fileName =
      'Invoice_' +
      emp[0] +
      '_' +
      moment(this.selectedDate).format('DD-MM-YYYY') +
      '.xls';
    this.timesheetService
      .downloadInvoice(
        contract[0],
        emp[0],
        moment(this.selectedDate).format('DD-MM-YYYY')
      )
      .subscribe((data: any) => {
        console.log(data);

        let blob: any = new Blob([data], {
          type: 'text/json; charset=utf-8',
        });
        console.log(blob);
        const size = blob.size;
        if (size > 0) {
          importedSaveAs(blob, fileName);
        } else {
          this.status = 'invoiceFailed';
        }
      });
  }

  download(filename): void {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    let emp = this.empName.split('-');
    this.timesheetService
      .download(
        filename,
        emp[0],
        moment(this.selectedDate).format('DD-MM-YYYY')
      )
      .subscribe((data) => {
        window.open(data.url);
        let blob: any = new Blob([data], { type: 'text/json; charset=utf-8' });
        importedSaveAs(blob, filename);
      });
  }

  delete(filename): void {
    let emp = this.empName.split('-');
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.timesheetService
      .delete(filename, emp[0], moment(this.selectedDate).format('DD-MM-YYYY'))
      .subscribe((data) => {
        this.documentList = data.uploadedFilesList;
      });
  }
}

interface Timesheet {
  contractId: string;
  comments: string;
  hrComments: string;
  noOfHrs: string;
  contractTimeSheetList: {
    day: string;
    dayName: string;
    isDisabled: boolean;
    filledData: string;
  };
}
