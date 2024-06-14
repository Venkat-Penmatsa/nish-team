import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MobilityhistoryComponent } from '../mobilityhistory/mobilityhistory.component';
import { MobilityService } from 'src/app/services/mobility.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mobilitydetails',
  templateUrl: './mobilitydetails.component.html',
  styleUrls: ['./mobilitydetails.component.css'],
})
export class MobilitydetailsComponent implements OnInit {
  constructor(
    private mobilityService: MobilityService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private readonly authService: AuthService
  ) {}
  mobDetails: any;
  isDataLoaded: boolean = false;
  message = '';

  ngOnInit(): void {
    console.log(' mobility details .........');

    let user: any = JSON.parse(localStorage.getItem('user') || '{}');

    this.mobilityService.fetchMobilityById(user.empId).subscribe((res) => {
      this.mobDetails = res;
      if (res.isMobilityApplicable) {
        this.mobilityForm.patchValue({
          isMobilityOpted: res.isMobilityOpted,
          mobilityEffectiveDate: new Date(res.mobilityEffectiveDate),
          applicableBudget: res.applicableBudget,
          consumedBudget: res.consumedBudget,
          availableBudget: res.availableBudget,
        });
      } else {
        if (res.assetId != '' && res.assetId != null) {
          this.message =
            'Car is allocated to you, Mobility Budget is not applicable';
        } else {
          this.message = 'For a freelancer, Mobility Budget is Not Applicable';
        }
      }

      this.isDataLoaded = true;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(MobilityhistoryComponent, {
      height: '80%',
      width: '80%',
      data: this.mobDetails,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  mobilityForm = this.fb.group({
    applicableBudget: [],
    consumedBudget: [],
    availableBudget: [],
    isMobilityOpted: [],
    mobilityEffectiveDate: [new Date()],
  });
}
