import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Optional } from '@angular/core';
import { EmployeeDependents } from 'src/app/model/EmployeeDependents';
import { DependantService } from '../../dependant/dependant.service';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE,MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from 'src/app/constants/DateFormat';

@Component({
  selector: 'app-add-dependant',
  templateUrl: './add-dependant.component.html',
  styleUrls: ['./add-dependant.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AddDependantComponent implements OnInit {


  employeeDependent:EmployeeDependents;
  
  constructor(public dialogRef: MatDialogRef<AddDependantComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EmployeeDependents,
    public dataService: DependantService)  { 
      this.employeeDependent = {...data};
    }

  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log('add data..........'+this.employeeDependent);
    this.dataService.employeeDependent = this.employeeDependent;
    this.dataService.addDependant(this.employeeDependent);
  }

  ngOnInit(): void {
  }

  dobFilter =  new Date();

}
