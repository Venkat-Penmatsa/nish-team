import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    NgxExtendedPdfViewerModule,
  ],
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  policies: any = [
    {
      name: 'NISH Training & Certification',
      source: '../../../../assets/pdf/Training.pdf',
    },
    {
      name: 'Mobility Budget',
      source: '../../../../assets/pdf/Mobility.pdf',
    },
  ];
  selectedPolicy = this.policies[0];
  constructor(public dialogRef: MatDialogRef<PolicyComponent>) {}

  ngOnInit(): void {}

  onTabChange(event: any) {
    this.selectedPolicy = this.policies[event.index];
  }
  close() {
    this.dialogRef.close();
  }
}
