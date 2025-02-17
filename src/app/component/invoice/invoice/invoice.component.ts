import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public invoiceService: InvoiceService,
    public loader: LoaderService
  ) {}
  successFlag: Boolean = false;
  errorFlag: Boolean = false;
  errorDescription: string = '';
  successDescription: string = '';

  ngOnInit(): void {
    this.getInvoiceSeq();
  }

  invoiceSeq() {
    const body = JSON.stringify(this.invoiceSeqForm.getRawValue());
    this.invoiceService.updateInvoiceSeq(body).subscribe((data) => {
      console.log('data ==========> ' + data);
      if (data.errorCode == 'true') {
        this.errorFlag = true;
        this.errorDescription = data.errorDescription;
      } else {
        this.successFlag = true;
        this.successDescription = data.successMessage;
      }
    });
  }

  getInvoiceSeq() {
    this.invoiceService.getInvoiceSeq().subscribe((res: any) => {
      this.invoiceSeqForm.patchValue({
        nishTechyear: res.nishTechyear,
        nishTechMonth: res.nishTechMonth,
        nishyear: res.nishyear,
        nishMonth: res.nishMonth,
      });
    });
  }

  invoiceSeqForm = this.fb.group({
    nishTechyear: ['', Validators.required],
    nishTechMonth: ['', Validators.required],
    nishyear: ['', Validators.required],
    nishMonth: ['', Validators.required],
  });
}
