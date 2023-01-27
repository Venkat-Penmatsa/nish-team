import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { Moment } from 'moment';
import { User } from 'src/app/model/User';
import { MobilityService } from 'src/app/services/mobility.service';

@Component({
  selector: 'app-monthmobility',
  templateUrl: './monthmobility.component.html',
  styleUrls: ['./monthmobility.component.css']
})
export class MonthmobilityComponent implements OnInit {
  filterEmpName: string;
  empName: any;
  message = false;
  messageDesc = "";
  error = false;
  errorDesc = "";
  yearSelected = new FormControl(moment());
  mobilitySecFlag = false;
  mobilityStatusChecked: boolean = false;
  user: User;



  constructor(private fb: FormBuilder, private mobilityService: MobilityService) { }

  ngOnInit(): void {

    this.monthMobilityForm.patchValue({
      compHouse: 0,
      compTravelPass: 0,
      compOthers: 0
    });

  }


  empNameSelected(emp: any) {
    this.empName = emp;
    this.getMobilityDetails();
  }

  dateFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  }

  chosenYearHandler() {
    //let ctrlValue: any = this.yearSelected.value;
    //ctrlValue.year(normalizedYear.year() + normalizedYear.month() );
    //this.yearSelected.setValue(ctrlValue);
    //dp.close();
    //console.log(this.yearSelected.value, ctrlValue);
    this.getMobilityDetails();

  }

  getMobilityDetails() {

    this.message = false;
    this.error = false;

    const emparr = this.empName.split("-");
    const selectedDat = moment(this.yearSelected.value).format("DD-MM-YYYY");
    this.mobilityService.getMobilityDetails(emparr[0], selectedDat).subscribe(res => {
      console.log(res);
      this.mobilityForm.patchValue({
        isMobilityOpted: res.isMobilityOpted,
        mobilityEffectiveDate: new Date(res.mobilityEffectiveDate),
        applicableBudget: res.applicableBudget,
        consumedBudget: res.consumedBudget,
        availableBudget: res.availableBudget,
        comments: res.comments
      })
      if (res.isMobilityOpted) {
        this.mobilitySecFlag = true;
      }
      if (res.responseStatus == 'Failed') {
        this.error = true;
        this.errorDesc = res.errorDescription;
      }
    });


    this.mobilityService.getMonthMobilityDetails(emparr[0], selectedDat).subscribe(res => {
      console.log(res);

      if (res.responseStatus == 'Success') {

        this.monthMobilityForm.patchValue({
          compHouse: res.compHouse,
          compTravelPass: res.compTravelPass,
          compOthers: res.compOthers,
          totalAllowanceApplied: res.totalAllowanceApplied,
          comments: res.comments
        })
      }

      if (res.isMobilityOpted) {
        this.mobilitySecFlag = true;
      }
      if (res.responseStatus == 'Failed') {
        this.error = true;
        this.errorDesc = res.errorDescription;
      }
    });

  }

  calculateTotalAllowance() {

    console.log('calculateTotalAllowance');

    const compHouse = this.monthMobilityForm.get('compHouse')?.value;
    const compTravelPass = this.monthMobilityForm.get('compTravelPass')?.value;
    const compOthers = this.monthMobilityForm.get('compOthers')?.value;

    if (compHouse != null && compTravelPass != null && compOthers != null) {
      this.monthMobilityForm.patchValue({
        totalAllowanceApplied: compHouse + compTravelPass + compOthers
      });
    }
  }

  enableMobilitySection(status: any) {
    console.log(status);
    this.mobilitySecFlag = status;
  }

  onSubmit() {

    this.message = false;
    this.error = false;

    if (this.empName && this.yearSelected) {
      this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
      this.monthMobilityForm.patchValue({
        empId: this.empName,
        udpatedBy: this.user.empId,
        selectedDate: this.yearSelected.value,
        appliedDate: this.yearSelected.value,
        appliedMonth: this.yearSelected.value
      })
      this.mobilityService.applyMonthMobility(this.monthMobilityForm.value).subscribe(res => {
        console.log(res);

        if (res.responseStatus == 'Success') {
          this.message = true;
          this.messageDesc = "Mobility details updated successfully";
        } else if (res.responseStatus == 'Failed') {
          this.error = true;
          this.errorDesc = res.errorDescription;
        }

        this.mobilityForm.reset();
        this.monthMobilityForm.reset();
      });
    }
  }

  mobilityForm = this.fb.group({
    isMobilityOpted: ['', Validators.required],
    mobilityEffectiveDate: [new Date(),],
    applicableBudget: ['',],
    consumedBudget: ['',],
    availableBudget: ['',],
    comments: [''],
    empId: [''],
    selectedDate: new FormControl(moment()),
    udpatedBy: ['']
  });


  monthMobilityForm = this.fb.group({
    compHouse: [0.0, Validators.required],
    compTravelPass: [0.0, Validators.required],
    compOthers: [0.0, Validators.required],
    totalAllowanceApplied: [0.0, Validators.required],
    comments: [''],
    empId: [''],
    selectedDate: new FormControl(moment()),
    udpatedBy: [''],
    appliedDate: new FormControl(moment()),
    appliedMonth: new FormControl(moment())
  });

}
