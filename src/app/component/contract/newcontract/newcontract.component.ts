import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NewcontractService } from 'src/app/services/contracts/newcontract.service';

@Component({
  selector: 'app-newcontract',
  templateUrl: './newcontract.component.html',
  styleUrls: ['./newcontract.component.css']
})
export class NewcontractComponent implements OnInit {

  public nishContractId: number;
  public successFlag: Boolean = false;

  constructor(private fb: FormBuilder, private newcontractService: NewcontractService, private http: HttpClient) {

  }

  ngOnInit(): void {

  }

  createNewcontract() {

  }

  onSubmit() {
    console.log(this.newContractForm.value);
    const body = JSON.stringify(this.newContractForm.value);
    console.log("String..." + body)

    const headers = { 'Content-type': 'application/json' };

    this.http.post<ContractResponse>('http://localhost:8091/contract/newContract', body, { headers })
      .subscribe(data => {
        console.log("data ==========> " + data);
        this.nishContractId = data.nishContractId;
        //this.nishContractId = data.nishContractId;
      })
    this.successFlag = true;
    console.log("nishContractId..." + this.nishContractId)

  }


  newContractForm = this.fb.group({

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
    comments: ['']
  });

}


interface ContractResponse {
  nishContractId: number;
  errorCode: string;
  errorDescription: String;
}