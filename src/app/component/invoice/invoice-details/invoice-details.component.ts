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
import { InvoiceService } from 'src/app/services/invoice.service';
import { LoaderService } from 'src/app/services/loader.service';
const moment = _moment;

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  nishContractId: number;
  successFlag: Boolean = false;
  errorFlag: Boolean = false;
  errorDescription: any;
  invoice: any;
  user: User;
  loading$: any;

  constructor(
    private fb: UntypedFormBuilder,
    public invoiceService: InvoiceService,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {}

  dateOfJoiningFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  };

  searchInvoiceId($event: Event) {
    this.successFlag = false;
    const invoiceId = ($event.target as HTMLTextAreaElement).value;
    if (invoiceId != '') {
      this.invoiceService
        .fetchInvoice(invoiceId.replace('/', '!'))
        .subscribe((res) => {
          console.log(res);
          this.invoice = res;
          this.invoiceForm.patchValue({
            invoiceId: this.invoice.invoiceId,
            contractId: this.invoice.nishContractId,
            employeeId: this.invoice.employeeId,
            status: this.invoice.status,
            comments: this.invoice.comments,
          });
          if (this.invoice.submittedDate != null) {
            this.invoiceForm.patchValue({
              submittedDate: new Date(this.invoice.submittedDate),
            });
          }
          if (this.invoice.billReceivedDate != null) {
            this.invoiceForm.patchValue({
              billReceivedDate: new Date(this.invoice.billReceivedDate),
            });
          }
          if (this.invoice.generatedDate != null) {
            this.invoiceForm.patchValue({
              generatedDate: new Date(this.invoice.generatedDate),
            });
          }
          if (this.invoice.onHoldDate != null) {
            this.invoiceForm.patchValue({
              onHoldDate: new Date(this.invoice.onHoldDate),
            });
          }
        });
    }
  }

  onSubmit() {
    this.errorFlag = false;
    this.successFlag = false;

    this.user = JSON.parse(localStorage.getItem('userDetails') || '{}') as User;
    const body = JSON.stringify(this.invoiceForm.getRawValue());

    console.log('leaves jason' + body);

    this.invoiceService.updateInvoice(body).subscribe((data) => {
      console.log('data ==========> ' + data);

      if (data.errorCode == 'true') {
        this.errorFlag = true;
        this.errorDescription = data.errorDescription;
      } else {
        this.successFlag = true;
        this.nishContractId = data.nishContractId;
      }
    });
  }

  invoiceForm = this.fb.group({
    invoiceId: ['', Validators.required],
    contractId: ['', Validators.required],
    employeeId: ['', Validators.required],
    status: ['', Validators.required],
    generatedDate: [''],
    submittedDate: [''],
    billReceivedDate: [''],
    billRejectedDate: [''],
    onHoldDate: [''],
    comments: [''],
  });
}
