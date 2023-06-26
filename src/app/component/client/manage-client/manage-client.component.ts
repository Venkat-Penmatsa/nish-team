import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { User } from 'src/app/model/User';
import { ClientDetailsService } from 'src/app/services/client-details.service';
import { LoaderService } from 'src/app/services/loader.service';
const moment = _moment;

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.css'],
})
export class ManageClientComponent implements OnInit {
  clientId: number;
  successFlag: Boolean = false;
  errorFlag: Boolean = false;
  errorDescription: any;
  clientDetails: any;
  user: User;
  loading$: any;

  newClientForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private clientDetailsService: ClientDetailsService,
    private http: HttpClient,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.newClientForm = this.fb.group({
      clientId: [''],
      clientName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      postcode: ['', Validators.required],
      country: ['', Validators.required],
      tva: ['', Validators.required],
      invoicePaymentDays: ['', Validators.required],
      clientOnBoardedDate: [''],
      clientEmail: [''],
      clientPhone: [''],
      clientPointOfContact: [''],
      comments: [''],
      updatedBy: [''],
    });
  }

  searchContractId($event: Event) {
    this.successFlag = false;
    const contractID = ($event.target as HTMLTextAreaElement).value;
    if (contractID != '') {
      this.clientDetailsService
        .fetchCustomerInfo(contractID)
        .subscribe((res: any) => {
          this.newClientForm.patchValue({
            clientId: res.clientId,
            clientName: res.clientName,
            address1: res.address1,
            address2: res.address2,
            postcode: res.postcode,
            country: res.country,
            tva: res.tva,
            invoicePaymentDays: res.invoicePaymentDays,
            clientOnBoardedDate: moment(res.clientOnBoardedDate, 'MM/DD/YYYY'),
            clientEmail: res.clientEmail,
            clientPhone: res.clientPhone,
            clientPointOfContact: res.clientPointOfContact,
            comments: res.comments,
          });
        });
    }
  }

  onSubmit() {
    this.errorFlag = false;
    this.successFlag = false;

    this.user = JSON.parse(localStorage.getItem('userDetails') || '{}') as User;
    this.newClientForm.patchValue({
      updatedBy: this.user.empId,
    });
    const body = JSON.stringify(this.newClientForm.getRawValue());

    this.clientDetailsService.manageCustomer(body).subscribe((data) => {
      console.log('data ==========> ' + data);
      if (data.responseStatus == 'Failed') {
        this.errorFlag = true;
        this.errorDescription =
          'Technical error while updating the customer details, please update issue to technical team';
      } else {
        this.successFlag = true;
        this.clientId = data.clientId;
        this.newClientForm.reset();
      }
    });
  }
}
