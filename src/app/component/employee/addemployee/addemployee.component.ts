import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { Employee } from 'src/app/model/Employee';
import { EmployeeDependents } from 'src/app/model/EmployeeDependents';
import { ResidenceAddress } from 'src/app/model/ResidenceAddress';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

 
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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['JAVA'];
  allFruits: string[] = ['Microservices', 'Testing', 'cloud Engineer', 'Devops Engineer', 'dotnet framework'];
  dob: Date;
  empDependants: EmployeeDependents[] = [];
  savedEmpDependants : EmployeeDependents[] = [];
  employee: Employee = new Employee();
  empId ="";
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('marriageCheckbox') marriageCheckbox: ElementRef;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {

    let martialFlag = this.empCreationForm.controls['empBasicInfo'].value.martialStatus;
    console.log('flag.........' + martialFlag);


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


  disablePermananetAddressSection(status: any) {
    if (status) {
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

  dependantSubmitted(dependant : EmployeeDependents[]) {
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
    const empJson = JSON.stringify(this.employee);
    console.log('empJson ' +empJson);
    console.log('dob ' + this.dob);
    const headers = { 'Content-type': 'application/json' };

    this.http.post<EmployeeResponse>('http://localhost:8091/employee/createEmployee', empJson, { headers })
      .subscribe(data => {
        console.log("data ==========> " + data);
        this.employeeId = data.employeeId;
        //this.nishContractId = data.nishContractId;
      })
    this.successFlag = true;
    console.log("employeeId..." + this.employeeId)

  }

  searchEmployee($event: Event){
    
    const empId = ($event.target as HTMLTextAreaElement).value;
    if(empId!=""){
      this.empCreationForm.reset();
      this.savedEmpDependants = [];
      console.log(' Employee to be identified. ' + ($event.target as HTMLTextAreaElement).value);
      this.http.get<Employee>('http://localhost:8091/employee/getEmployeeById/'+empId,)
      .subscribe(data => {
        console.log("data ==========> " + data);
        this.employee = data;
        this.empCreationForm.patchValue({
          empBasicInfo: this.employee.empBasicInfo,
          employeeAddress: this.employee.employeeAddress
        });
        this.empCreationForm.patchValue({
          empBasicInfo : {
            //dob :  moment(this.employee.empBasicInfo.dob, "DD/MM/YYYY"),
            dob : new Date(this.employee.empBasicInfo.dob),
            onboardingDate : new Date(this.employee.empBasicInfo.onboardingDate)
          }
        });
        this.savedEmpDependants  = this.employee.employeeDependents;
        this.empId = this.employee.empBasicInfo.empId;
        if(this.savedEmpDependants != null && this.savedEmpDependants.length > 0) {
          this.showMarriageSectionFlag = true;
          this.marriageCheckbox['checked'] = true;
         // this.dob = new Date(this.employee.empBasicInfo.dob);
        }
        this.uploadDocuments = true;
      })

    }
  }
 
  dobFilter =  new Date();

  dateOfJoiningFilter=(d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
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
      addressId:[],
      currentAddress1: ['', Validators.required],
      currentAddress2: [],
      currentCity: ['', Validators.required],
      currentState: [],
      currentCountry: ['', Validators.required],
      currentPincode: ['', Validators.required],
      currentPermanetFlag: [],
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


interface EmployeeResponse {
  employeeId: number;
  errorCode: string;
  errorDescription: String;
}