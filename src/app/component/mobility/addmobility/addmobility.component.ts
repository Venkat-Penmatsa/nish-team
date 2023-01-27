import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { Moment } from 'moment';
import { User } from 'src/app/model/User';
import { MobilityService } from 'src/app/services/mobility.service';

@Component({
  selector: 'app-addmobility',
  templateUrl: './addmobility.component.html',
  styleUrls: ['./addmobility.component.css']
})
export class AddmobilityComponent implements OnInit {

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
  }

  empNameSelected(emp: any) {
    this.empName = emp;
    this.getMobilityDetails();
  }

  dateFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  }

  chosenYearHandler(normalizedYear: Moment, dp: any) {
    let ctrlValue: any = this.yearSelected.value;
    ctrlValue.year(normalizedYear.year());
    this.yearSelected.setValue(ctrlValue);
    dp.close();
    console.log(this.yearSelected.value, ctrlValue);
    this.getMobilityDetails();

  }

  getMobilityDetails() {

    this.message = false;
    this.error = false;

    const emparr = this.empName.split("-");
    const selectedDat = moment(this.yearSelected.value).format("DD-MM-YYYY");
    this.mobilityService.getMobilityDetails(emparr[0], selectedDat).subscribe(res => {
      this.mobilityForm.patchValue({
        isMobilityOpted: res.isMobilityOpted,
        mobilityEffectiveDate: new Date(res.mobilityEffectiveDate),
        applicableBudget: res.applicableBudget,
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
      this.mobilityForm.patchValue({
        empId: this.empName,
        udpatedBy: this.user.empId,
        selectedDate: this.yearSelected.value,
        mobilityEffectiveDate: new Date(moment(this.mobilityForm.value.mobilityEffectiveDate).utcOffset('+2000').format('YYYY-MM-DD')),

      })
      this.mobilityService.applyMobility(this.mobilityForm.value).subscribe(res => {

        if (res.responseStatus == 'Success') {
          this.message = true;
          this.messageDesc = "Mobility details updated successfully";
        } else if (res.responseStatus == 'Failed') {
          this.error = true;
          this.errorDesc = res.errorDescription;
        }

        this.mobilityForm.reset();
      });
    }
  }

  mobilityForm = this.fb.group({
    isMobilityOpted: ['', Validators.required],
    mobilityEffectiveDate: [new Date(), Validators.required],
    applicableBudget: ['', Validators.required],
    comments: [''],
    empId: [''],
    selectedDate: new FormControl(moment()),
    udpatedBy: ['']
  });

}
