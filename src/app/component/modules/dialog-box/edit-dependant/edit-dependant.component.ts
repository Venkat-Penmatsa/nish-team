import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmployeeDependents } from 'src/app/model/EmployeeDependents';
import { Optional } from '@angular/core';

@Component({
  selector: 'app-edit-dependant',
  templateUrl: './edit-dependant.component.html',
  styleUrls: ['./edit-dependant.component.css']
})
export class EditDependantComponent implements OnInit {

  employeeDependent:EmployeeDependents;

  constructor(public dialogRef: MatDialogRef<EditDependantComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EmployeeDependents) { }

  ngOnInit(): void {
  }


  formControl = new FormControl('', [
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

  stopEdit(): void {
    //this.dataService.updateIssue(this.data);
  }

}
