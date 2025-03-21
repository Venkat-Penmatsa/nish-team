import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-car-policy',
  templateUrl: './car-policy.component.html',
  styleUrls: ['./car-policy.component.css'],
})
export class CarPolicyComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CarPolicyComponent>) {}

  ngOnInit(): void {}

  carPolicySource: string = '../../../../assets/pdf/CarPolicy.pdf';

  close() {
    this.dialogRef.close();
  }
}
