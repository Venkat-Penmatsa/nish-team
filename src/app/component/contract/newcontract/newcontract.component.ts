import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { User } from 'src/app/model/User';
import { NewcontractService } from 'src/app/services/contracts/newcontract.service';
import { LoaderService } from 'src/app/services/loader.service';
const moment = _moment;
@Component({
  selector: 'app-newcontract',
  templateUrl: './newcontract.component.html',
  styleUrls: ['./newcontract.component.css'],
})
export class NewcontractComponent implements OnInit {
  nishContractId: number;
  successFlag: Boolean = false;
  errorFlag: Boolean = false;
  errorDescription: any;
  empName: any;
  customerName: any;
  contract: any;
  filterEmpName: string;
  filterCustomerName: string;
  user: User;
  loading$: any;

  newContractForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private newcontractService: NewcontractService,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.newContractForm = this.fb.group({
      nishContractId: [''],
      employeeId: [''],
      contractId: [''],
      contractStatus: ['', Validators.required],
      clientName: ['', Validators.required],
      contractCompanyName: ['', Validators.required],
      subContractCompany1: [''],
      subContractCompany2: [''],
      subContractCompany3: [''],
      billingRate: ['', Validators.required],
      contractStartDate: ['', Validators.required],
      contractEndDate: ['', Validators.required],
      contractType: ['', Validators.required],
      perDayHrs: ['', Validators.required],
      comments: [''],
      updatedBy: [''],
      contractReference: [''],
      vosReference: [''],
      entity: [''],
      tsFlag: [''],
      invoicesDH: [''],
      invoiceDueDate: [''],
      customerId: [''],
    });
  }

  dateOfJoiningFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  };

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  custNameSelected(custId: any) {
    this.customerName = custId;
  }

  searchContractId($event: Event) {
    this.successFlag = false;
    const contractID = ($event.target as HTMLTextAreaElement).value;
    if (contractID != '') {
      this.newcontractService.fetchContractInfo(contractID).subscribe((res) => {
        console.log(res);
        this.contract = res;
        console.log('start date ******* ' + this.contract.contractStartDate);
        console.log('end date ******* ' + this.contract.contractEndDate);
        this.newContractForm.patchValue({
          nishContractId: this.contract.nishContractId,
          employeeId: this.contract.employeeId,
          contractId: this.contract.contractId,
          contractStatus: this.contract.contractStatus,
          clientName: this.contract.clientName,
          contractCompanyName: this.contract.contractCompanyName,
          subContractCompany1: this.contract.subContractCompany1,
          subContractCompany2: this.contract.subContractCompany2,
          subContractCompany3: this.contract.subContractCompany3,
          billingRate: this.contract.billingRate,
          contractStartDate: moment(
            this.contract.contractStartDate,
            'MM/DD/YYYY'
          ),
          contractEndDate: moment(this.contract.contractEndDate, 'MM/DD/YYYY'),
          comments: this.contract.comments,
          contractType: this.contract.contractType,
          perDayHrs: this.contract.perDayHrs,
          contractReference: this.contract.contractReference,
          vosReference: this.contract.vosReference,
          entity: this.contract.entity,
          //customerId: this.contract.perDayHrs,
          tsFlag: this.contract.tsFlag,
          invoicesDH: this.contract.invoicesDH,
          invoiceDueDate: this.contract.invoiceDueDate,
        });
        this.filterEmpName = this.contract.employeeId;
        this.filterCustomerName = this.contract.customerId;
        // this.newContractForm.controls['billingRate'].disable();
        console.log(' filter cutomer name is ', this.filterCustomerName);
        this.newContractForm.controls['employeeId'].disable();
        this.filterCustomerName = this.contract.customerId;
        this.customerName = this.contract.customerId;
      });
    }
  }

  onSubmit() {
    this.errorFlag = false;
    this.successFlag = false;

    this.user = JSON.parse(localStorage.getItem('userDetails') || '{}') as User;
    console.log(this.newContractForm.value);
    this.newContractForm.patchValue({
      employeeId: this.empName,
      updatedBy: this.user.empId,
      customerId: this.customerName,
      contractStartDate: new Date(
        moment(this.newContractForm.value.contractStartDate)
          .utcOffset('+2000')
          .format('YYYY-MM-DD')
      ),
      contractEndDate: new Date(
        moment(this.newContractForm.value.contractEndDate)
          .utcOffset('+2000')
          .format('YYYY-MM-DD')
      ),
    });
    const body = JSON.stringify(this.newContractForm.getRawValue());

    console.log('leaves jason' + body);

    this.newcontractService.createContract(body).subscribe((data) => {
      console.log('data ==========> ' + data);

      if (data.errorCode == 'true') {
        this.errorFlag = true;
        this.errorDescription = data.errorDescription;
      } else {
        this.successFlag = true;
        this.nishContractId = data.nishContractId;
        this.newContractForm.reset();
      }
    });

    console.log('nishContractId...' + this.nishContractId);
  }
}

interface ContractResponse {
  nishContractId: number;
  errorCode: string;
  errorDescription: String;
}
