import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {

  skillset: [];
  empDep: any = [];

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmpDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.empCreationForm.patchValue({
      empBasicInfo: data.empBasicInfo,
      employeeAddress: data.employeeAddress
    });
    this.skillset = data.skillset.skillset;
    this.empDep = data.employeeDependents;
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  empCreationForm = this.fb.group({
    empBasicInfo: this.fb.group({
      empId: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['', Validators.required],
      dob: ['', Validators.required],
      ssn: [],
      rpExpiryDate: [],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      landline: [],
      passportId: [],
      onboardingStatus: ['', Validators.required],
      onboardingDate: ['', Validators.required],
      ibannumber: [],
      bicCode: [],
      martialStatus: [''],
      emergencyContactPerson: [],
      emergencyContactNumber: [],
      entity: [],
      empLastDate: [],
      hrSpoc: []
    }
    ),
    employeeAddress: this.fb.group({
      addressId: [],
      currentAddress1: ['', Validators.required],
      currentAddress2: [],
      currentCity: ['', Validators.required],
      currentState: [],
      currentCountry: ['', Validators.required],
      currentPincode: ['', Validators.required],
      nationality: [],
      permanentAddress1: [],
      permanentAddress2: [],
      permanentAddcity: [],
      permanentAddstate: [],
      permanentAddcountry: [],
      permanentAddpincode: []
    }
    ),
    updatedBy: []
  });

}
