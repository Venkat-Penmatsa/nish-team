import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent implements OnInit {

  leaves: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ApplyLeavesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.leaves = data;

  }

  ngOnInit(): void {
  }

}
