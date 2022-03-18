import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/model/Employee';
import { EmployeeDependents } from 'src/app/model/EmployeeDependents';
import * as _moment from 'moment';
import { skills } from 'src/app/constants/skills';
import { EmployeeService } from 'src/app/services/employee.service';
import { Moment } from 'moment';
import { LoaderService } from 'src/app/services/loader.service';

const moment = _moment;

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit, OnChanges {


  public employeeId: number;
  public successFlag: Boolean = false;
  showMarriageSectionFlag = false;
  disablePermanentSectionFlag = true;
  uploadDocuments = false
  public step = 0;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  dob: Date;
  empDependants: EmployeeDependents[] = [];
  savedEmpDependants: EmployeeDependents[] = [];
  employee: Employee = new Employee();
  empId = "";
  skillsetList: string[] = skills;
  skillset: FormControl = new FormControl();
  fileList = 'employee';
  retrievedImage: any;
  base64Data: any;
  filterEmpName: string;
  empName: any = undefined;
  martialStatusChecked: boolean = false;
  loading$: any;


  @ViewChild('marriageCheckbox') marriageCheckbox: ElementRef;


  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private loader: LoaderService) {

  }

  ngOnInit(): void {
    this.loading$ = this.loader.loading$;
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.loading$ = this.loader.loading$;
  }

  setStep(index: number) {
    this.step = index;
  }

  employeeDetailsValidation() {
    console.log(' validation flag value ... ' + this.empCreationForm.get('empBasicInfo')?.valid)
    if (this.empCreationForm.get('empBasicInfo')?.valid) {
      console.log(' validation flag value ... ' + this.empCreationForm.get('empBasicInfo')?.valid)
      this.step++;
    }
  }

  addressDetailsValidation() {
    if (this.empCreationForm.get('employeeAddress')?.valid) {
      console.log(' validation flag value ... ' + this.empCreationForm.get('empBasicInfo')?.valid)
      this.step++;
    }
  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }


  onNationalitySelected(country: any) {
    if (country == "Belgium") {
      this.disablePermanentSectionFlag = false;
    } else {
      this.disablePermanentSectionFlag = true;
    }
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  dependantSubmitted(dependant: EmployeeDependents[]) {
    this.empDependants = dependant;
  }

  enableDependentSection(status: any) {
    console.log(status);
    this.showMarriageSectionFlag = status;
  }


  onSubmit() {
    console.log(this.empCreationForm.value);
    this.employee = Object.assign({}, this.empCreationForm.value);
    this.employee.employeeDependents = this.empDependants;
    let dsd = this.empCreationForm.get('empBasicInfo.dob');
    this.employee.empBasicInfo.dob = dsd?.value;

    const empJson = JSON.stringify(this.employee);
    console.log('empJson ' + empJson);
    const headers = { 'Content-type': 'application/json' };

    this.employeeService.createEmployee(this.employee)
      .subscribe(data => {
        console.log("data ==========> " + data);
        this.employeeId = data.employeeId;
        //this.nishContractId = data.nishContractId;
      })
    this.successFlag = true;
    console.log("employeeId..." + this.employeeId)

  }

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  searchEmployees() {
    this.successFlag = false;
    if (this.empName != "") {
      const emparr = this.empName.split("-");
      this.empCreationForm.reset();
      this.savedEmpDependants = [];
      this.employeeService.fetchEmployeeById(emparr[0])
        .subscribe(data => {
          console.log("data ==========> " + data);
          this.employee = data;
          this.empCreationForm.patchValue({
            empBasicInfo: this.employee.empBasicInfo,
            employeeAddress: this.employee.employeeAddress,
            skillset: this.employee.skillset
          });
          this.savedEmpDependants = this.employee.employeeDependents;
          this.empId = this.employee.empBasicInfo.empId;
          if (this.savedEmpDependants != null && this.savedEmpDependants.length > 0) {
            this.showMarriageSectionFlag = true;
            this.martialStatusChecked = true;
          }
          this.uploadDocuments = true;

          if (this.employee.employeeAddress.nationality == "Belgium") {
            this.disablePermanentSectionFlag = false;
          } else {
            this.disablePermanentSectionFlag = true;
          }

          this.base64Data = this.employee.empImage;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        })

    }
  }

  dobFilter = new Date();

  dateOfJoiningFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
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
      entity: []
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
    skillset: this.fb.group({
      skillset: ['', Validators.required]
    }
    )
  });

}

