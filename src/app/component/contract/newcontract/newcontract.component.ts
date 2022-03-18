import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { User } from 'src/app/model/User';
import { NewcontractService } from 'src/app/services/contracts/newcontract.service';
const moment = _moment;
@Component({
  selector: 'app-newcontract',
  templateUrl: './newcontract.component.html',
  styleUrls: ['./newcontract.component.css']
})
export class NewcontractComponent implements OnInit {

  public nishContractId: number;
  public successFlag: Boolean = false;
  empName: any;
  contract: any;
  filterEmpName: string;
  user: User;
  constructor(private fb: FormBuilder, private newcontractService: NewcontractService, private http: HttpClient) {
  }

  ngOnInit(): void {

  }


  dateOfJoiningFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  searchContractId($event: Event) {
    this.successFlag = false;
    const contractID = ($event.target as HTMLTextAreaElement).value;
    if (contractID != "") {
      this.newcontractService.fetchContractInfo(contractID).subscribe(res => {
        console.log(res);
        this.contract = res;
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
          contractStartDate: this.contract.contractStartDate,
          contractEndDate: this.contract.contractEndDate,
          comments: this.contract.comments
        });
        this.filterEmpName = this.contract.employeeId;
        this.newContractForm.controls['billingRate'].disable();
        this.newContractForm.controls['employeeId'].disable();
      });
    }
  }

  onSubmit() {
    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
    console.log(this.newContractForm.value);
    this.newContractForm.patchValue({
      employeeId: this.empName,
      updatedBy:this.user.empId
    })
    const body = JSON.stringify(this.newContractForm.getRawValue()
    );
    console.log("leaves jason" + body)

    const headers = { 'Content-type': 'application/json' };

    this.newcontractService.createContract(body)
      .subscribe(data => {
        console.log("data ==========> " + data);
        this.nishContractId = data.nishContractId;
        //this.nishContractId = data.nishContractId;
      })
    this.successFlag = true;
    console.log("nishContractId..." + this.nishContractId)
  }

  newContractForm = this.fb.group({
    nishContractId: [''],
    employeeId: ['', Validators.required],
    contractId: [''],
    contractStatus: [''],
    clientName: [''],
    contractCompanyName: [''],
    subContractCompany1: [''],
    subContractCompany2: [''],
    subContractCompany3: [''],
    billingRate: [''],
    contractStartDate: [''],
    contractEndDate: [''],
    comments: [''],
    updatedBy: ['']
  });

}


interface ContractResponse {
  nishContractId: number;
  errorCode: string;
  errorDescription: String;
}