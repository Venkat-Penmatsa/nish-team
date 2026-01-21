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
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-time-sheet-invoice',
  templateUrl: './time-sheet-invoice.component.html',
  styleUrls: ['./time-sheet-invoice.component.css'],
})
export class TimeSheetInvoiceComponent implements OnInit {
  header: any[] = [];
  rows: any[] = [];
  timesheetDataSource: Timesheet[] = [];
  timesheetHeader: any[] = [];
  timeSheetDetails: any;
  overTimeList: any[] = [];
  selectedDate = new Date();
  filterEmpName: string;
  empName: any = undefined;
  dataLoaded: boolean = false;
  overTimeFlag: boolean = false;
  status: string = '';
  errorDesc: string = '';
  successMessage: string = '';
  documentList: any;
  public file: File[];
  isAdmin: boolean = false;

  public fileUploadControl = new FileUploadControl({ listVisible: false });

  constructor(
    private timesheetService: TimesheetService,
    private spinner: NgxSpinnerService,
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

  enableTimesheet(contract: any) {
    this.status = '';
    let emp = this.empName.split('-');
    let contractID = contract.split('>>');
    const body = {
      contractId: contractID[0],
      employeeId: emp[0],
      selectedDate: moment(this.selectedDate).format('DD-MM-YYYY'),
    };

    this.timesheetService.updateTSInvoiceFlag(body).subscribe((data) => {
      this.status = data.responseStatus;
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
    let user: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.timeSheetDetails.timeSheetRow = this.rows;
    this.timeSheetDetails.updatedBy = user.empId;

    this.timesheetService
      .updateTimeSheet(this.timeSheetDetails)
      .subscribe((data) => {
        this.status = data.responseStatus;
        this.successMessage = 'Timesheet saved successfully';
      });

    console.log(' rows........' + this.rows);
  }

  updateOTTimeSheet() {
    this.status = '';
    let user: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
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
    this.overTimeList = [];
    console.log(' fetching timesheet ' + this.empName);
    this.status = '';
    let user: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    if (user.role == 'admin') {
      this.isAdmin = true;
    }

    this.timesheetService
      .fetchTimeSheet(
        this.empName,
        moment(this.selectedDate).format('DD-MM-YYYY'),
      )
      .subscribe((data) => {
        console.log('data ==========> ' + data);
        this.documentList = data.uploadedFilesList;
        this.timeSheetDetails = data;
        this.header = data.timeSheetHeader;
        this.timesheetHeader = data.timeSheetHeader;
        this.rows = data.timeSheetRow;
        this.overTimeFlag = data.overTimeFlag;
        //this.overTimeList = data.timeSheetRow[0].overTimeList;
        for (let i = 0; i < data.timeSheetRow.length; i++) {
          if (data.timeSheetRow[i].overTimeList != null) {
            this.overTimeList.push(...data.timeSheetRow[i].overTimeList);
          }
        }
        console.log(' this.leaves .........' + data);
        this.dataLoaded = true;
      });
  }

  calculateOT(data: any, row: any) {
    let item = this.overTimeList[row];
    var overTimeQty = data.target.value;
    var val = overTimeQty * item.overTimeRate;
    item.overTimeAmount = val;
    this.overTimeList[row] = item;
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
      moment(this.selectedDate).format('DD-MM-YYYY'),
    );

    this.timesheetService.upload(data).subscribe((res: any) => {
      this.documentList = res.body.uploadedFilesList;
      this.spinner.hide();
      this.fileUploadControl.clear();
    });
  }

  getPeppolInvoice(contractId: string): Boolean {
    let contract = contractId.split(' >>');
    let invoiceFileName = 'Invoice_' + contract[0] + '.pdf';
    let invoiceFile = this.documentList.find(
      (item: any) =>
        item.documentType === 'INVOICE_GENERATED' &&
        item.fileName === invoiceFileName &&
        item.peppolId,
    );
    return invoiceFile ? true : false;
  }

  getInvoice(contractId: string): Boolean {
    let contract = contractId.split(' >>');
    let invoiceFileName = 'Invoice_' + contract[0] + '.pdf';
    let invoiceFile = this.documentList.find(
      (item: any) =>
        item.documentType === 'INVOICE_GENERATED' &&
        item.fileName === invoiceFileName,
    );
    return invoiceFile ? true : false;
  }

  getCustomerType(iniFlowInvoiceId: string, otherAccSystem: Boolean): Boolean {
    if (otherAccSystem) {
      return true;
    } else if (iniFlowInvoiceId && !otherAccSystem) {
      return true;
    }
    return false;
  }

  getCreditNote(contractId: string): Boolean {
    let contract = contractId.split(' >>');
    let creditNoteFileName = 'CreditNote_' + contract[0] + '.pdf';
    let creditNoteG = this.documentList.find(
      (item: any) =>
        item.documentType === 'CREDIT_NOTE' &&
        item.fileName === creditNoteFileName &&
        !item.peppolId,
    );
    return creditNoteG ? true : false;
  }

  downloadInvoice(contractId) {
    console.log('Downloading the invoice ');
    this.spinner.show();
    this.status = '';
    const user: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    let contract = contractId.split(' >>');
    let emp = this.empName.split('-');
    const payload: any = {
      contractId: contract[0],
      employeeId: emp[0],
      requestedDate: moment(this.selectedDate).format('DD-MM-YYYY'),
      requestedBy: user.empId,
      language: 'EN',
      invoiceType: 'invoice',
    };

    let fileName =
      'Invoice_' +
      moment(this.selectedDate).format('MM-YYYY') +
      '_' +
      emp[1] +
      '.pdf';
    this.timesheetService.downloadiniFlowInvoice(payload).subscribe({
      next: (data: Blob) => {
        let blob: any = new Blob([data], { type: 'application/pdf' });
        importedSaveAs(blob, fileName);
        this.fetchTimesheet();
      },
      error: (error) => {
        console.error('Error downloading invoice:', error);
        this.status = 'Failed';
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  downloadCreditNote(contractId) {
    console.log('Downloading the invoice ');
    this.spinner.show();
    this.status = '';
    const user: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    let contract = contractId.split(' >>');
    let emp = this.empName.split('-');
    let invoiceFileName = 'Invoice_' + contract[0] + '.pdf';
    let invoiceFileId =
      this.documentList.find(
        (item: any) =>
          item.selectedFile &&
          item.documentType === 'INVOICE_GENERATED' &&
          item.fileName === invoiceFileName,
      )?.timeSheetDocId || '';

    if (!invoiceFileId) {
      this.status = 'validationFailed';
      this.spinner.hide();
      return;
    }

    const payload: any = {
      contractId: contract[0],
      employeeId: emp[0],
      requestedDate: moment(this.selectedDate).format('DD-MM-YYYY'),
      requestedBy: user.empId,
      language: 'EN',
      invoiceType: 'creditNote',
      invoiceFileId: invoiceFileId,
    };

    let fileName =
      'CreditNote_' +
      moment(this.selectedDate).format('MM-YYYY') +
      '_' +
      emp[1] +
      '.pdf';
    this.timesheetService.downloadiniFlowInvoice(payload).subscribe({
      next: (data: Blob) => {
        let blob: any = new Blob([data], { type: 'application/pdf' });
        importedSaveAs(blob, fileName);
        this.fetchTimesheet();
      },
      error: (error) => {
        console.error('Error downloading credit note:', error);
        this.status = 'Failed';
        this.errorDesc = error.message;
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  SendCNToIniFlow(contractId) {
    console.log('sending the CN to IniFlow ');
    this.spinner.show();
    this.status = '';
    const user: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    let contract = contractId.split(' >>');
    let emp = this.empName.split('-');
    let fileName = 'CreditNote_' + contract[0] + '.pdf';
    let cnFileId =
      this.documentList.find(
        (item: any) =>
          item.selectedFile &&
          item.documentType === 'CREDIT_NOTE' &&
          item.fileName === fileName,
      )?.timeSheetDocId || '';

    if (!cnFileId) {
      this.status = 'validationFailed';
      this.spinner.hide();
      return;
    }

    const payload: any = {
      contractId: contract[0],
      employeeId: emp[0],
      requestedDate: moment(this.selectedDate).format('DD-MM-YYYY'),
      requestedBy: user.empId,
      language: 'EN',
      invoiceType: 'creditNote',
      creditNoteFileId: cnFileId,
    };

    this.timesheetService.sendInvoiceToIniFlow(payload).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.responseStatus === 'Failed') {
          this.status = 'Failed';
          this.errorDesc = data.errorDescription;
        }
        if (data.responseStatus === 'Success') {
          this.fetchTimesheet();
          this.status = 'Success';
          this.successMessage = 'CreditNote successfully sent to IniFlow.';
        }
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error sending credit note to IniFlow:', error);
        this.status = 'Failed';
        this.errorDesc = error.message;
        this.spinner.hide();
      },
    });
  }

  SendInvoiceToIniFlow(contractId) {
    console.log('sending the invoice to IniFlow ');
    this.spinner.show();
    this.status = '';
    const user: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    let contract = contractId.split(' >>');
    let emp = this.empName.split('-');
    let fileName = 'Invoice_' + contract[0] + '.pdf';
    let invoiceFileId =
      this.documentList.find(
        (item: any) =>
          item.selectedFile &&
          item.documentType === 'INVOICE_GENERATED' &&
          item.fileName === fileName,
      )?.timeSheetDocId || '';

    let attachmentsFileId: [] = this.documentList
      .filter(
        (item: any) => item.selectedFile && item.documentType === 'TimeSheet',
      )
      .map((item: any) => item.timeSheetDocId);

    if (!invoiceFileId) {
      this.status = 'validationFailed';
      this.spinner.hide();
      return;
    }
    let tsRequiredFlag = this.rows.find(
      (item: any) => item.contractId.split(' >>')[0] === contract[0],
    )?.tsRequiredFlag;

    if (attachmentsFileId.length == 0 && tsRequiredFlag === 'YES') {
      this.status = 'validationFailed';
      this.spinner.hide();
      return;
    }

    const payload: any = {
      contractId: contract[0],
      employeeId: emp[0],
      requestedDate: moment(this.selectedDate).format('DD-MM-YYYY'),
      requestedBy: user.empId,
      language: 'EN',
      invoiceType: 'invoice',
      invoiceFileId: invoiceFileId,
      additionalInvoiceFileIds: attachmentsFileId,
    };

    this.timesheetService.sendInvoiceToIniFlow(payload).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.responseStatus === 'Failed') {
          this.status = 'Failed';
          this.errorDesc = data.errorDescription;
        }

        if (data.responseStatus === 'Success') {
          this.fetchTimesheet();
          this.status = 'Success';
          this.successMessage = 'Invoice successfully sent to IniFlow.';
        }
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error sending invoice to IniFlow:', error);
        this.status = 'Failed';
        this.errorDesc = error.message;
        this.spinner.hide();
      },
    });
  }

  downloadFile(filename, fileId): void {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    let emp = this.empName.split('-');
    this.timesheetService.downloadFile(fileId, filename).subscribe((data) => {
      window.open(data.url);
      let blob: any = new Blob([data], { type: 'text/json; charset=utf-8' });
      importedSaveAs(blob, filename);
    });
  }

  sendMail(contractId): void {
    this.spinner.show();
    const user: User = JSON.parse(
      localStorage.getItem('userDetails') || '{}',
    ) as User;

    let contract = contractId.split(' >>');

    let emp = this.empName.split('-');
    this.timesheetService
      .sendMail(
        contract[0],
        user.empId,
        moment(this.selectedDate).format('DD-MM-YYYY'),
        emp[0],
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.responseStatus === 'Failed') {
            this.status = 'Failed';
            this.errorDesc = data.errorDescription;
          }
          if (data.responseStatus === 'Success') {
            this.status = 'Success';
            this.successMessage = 'Mail sent successfully.';
          }
          this.spinner.hide();
        },
        error: (error) => {
          console.error('Error sending email :', error);
          this.status = 'Failed';
          this.errorDesc = error.message;
          this.spinner.hide();
        },
      });
  }

  download(filename): void {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    let emp = this.empName.split('-');
    this.timesheetService
      .download(
        filename,
        emp[0],
        moment(this.selectedDate).format('DD-MM-YYYY'),
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
