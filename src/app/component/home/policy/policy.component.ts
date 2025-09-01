import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    PdfViewerModule,
  ],
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  policies: any = [
    { name: 'Car Policy', source: '../../../../assets/pdf/Policies.pdf' },
    { name: 'Mobility Budget', source: '../../../../assets/pdf/CarPolicy.pdf' },
  ];

  constructor(
    public dialogRef: MatDialogRef<PolicyComponent>,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  traning: string = '../../../../assets/pdf/training.pdf';

  close() {
    this.dialogRef.close();
  }
}
