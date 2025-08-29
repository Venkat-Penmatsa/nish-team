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
  templates = [
    {
      entity: 'nishtech',
      template: ['NISH-Evere', 'NISH-Kraainem'],
    },
    {
      entity: 'nish',
      template: ['NISH Technologies-Evere', 'NISH Technologies-Sterrebeek'],
    },
  ];

  filteredTemplates: any = [];
  selectedEntity: string;
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
  showOverTimeSection: boolean = false;

  newContractForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private newcontractService: NewcontractService,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.newContractForm = this.fb.group({
      nishContractId: [''],
      searchNishContractId: [''],
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
      entity: ['', Validators.required],
      template: ['', Validators.required],
      tsFlag: ['', Validators.required],
      invoicesDH: ['', Validators.required],
      invoiceDueDate: [''],
      billingDays: ['', Validators.required],
      customerId: [''],
      isOverTime: [],
      contractOverTime: this.fb.group({
        otWeekEnds: [0, !Validators.required],
        otWeekEndsDH: ['H', !Validators.required],
        otSaturdays: [0, !Validators.required],
        otSaturdaysDH: ['H', !Validators.required],
        otSundayPH: [0],
        otSundayPHDH: ['H', !Validators.required],
        onCallWK: [0, !Validators.required],
        onCallWKDH: ['D', !Validators.required],
        onCallSaturday: [0, !Validators.required],
        onCallSaturdayDH: ['D', !Validators.required],
        onCallSunPH: [0, !Validators.required],
        onCallSunPHDH: ['D', !Validators.required],
      }),
    });
  }

  onEntitySelect(val: any) {
    var temp: any = this.templates.filter((i) => i.entity === val);
    this.filteredTemplates = temp[0].template;
  }

  dateOfJoiningFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  };

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  overTimeSection(status: any) {
    console.log(status);
    this.showOverTimeSection = status;
  }

  custNameSelected(custId: any) {
    this.customerName = custId;
  }
  cloneContract() {
    var cloneContractId =
      this.newContractForm.controls['searchNishContractId'].value;
    this.getContractInfo(cloneContractId);
    this.newContractForm.controls['nishContractId'].setValue('');
  }

  searchContractId($event: Event) {
    this.successFlag = false;
    const contractID = ($event.target as HTMLTextAreaElement).value;
    this.getContractInfo(contractID);
  }
  getContractInfo(contractID) {
    if (contractID != '') {
      this.newcontractService.fetchContractInfo(contractID).subscribe((res) => {
        console.log(res);
        this.contract = res;
        this.newContractForm.patchValue({
          //nishContractId: this.contract.nishContractId,
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
          template: this.contract.template,
          tsFlag: this.contract.tsFlag,
          invoicesDH: this.contract.invoicesDH,
          invoiceDueDate: this.contract.invoiceDueDate,
          billingDays: this.contract.billingDays,
          isOverTime: this.contract.isOverTime,
          contractOverTime: this.contract.contractOverTime,
        });
        this.filterEmpName = this.contract.employeeId;
        this.empName = this.contract.employeeId;
        this.filterCustomerName = this.contract.customerId;
        this.newContractForm.controls['employeeId'].disable();
        this.filterCustomerName = this.contract.customerId;
        this.customerName = this.contract.customerId;
        if (this.contract.isOverTime) {
          this.showOverTimeSection = true;
        }
      });
    }
  }

  onSubmit() {
    this.errorFlag = false;
    this.successFlag = false;

    if (this.customerName == '' || this.customerName == null) {
      this.errorFlag = true;
      this.errorDescription =
        'A Contract must be mapped to a Customer, please select a customer from dropdown';
      return;
    }

    if (this.empName == '' || this.empName == null) {
      this.errorFlag = true;
      this.errorDescription =
        'A Contract must be mapped to a NISH Employee, please select an employee from Search Employee field';
      return;
    }

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
