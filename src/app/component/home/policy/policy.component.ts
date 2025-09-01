import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<PolicyComponent>) {}

  ngOnInit(): void {}

  carPolicySource: string = '../../../../assets/pdf/Policies.pdf';

  close() {
    this.dialogRef.close();
  }
}
