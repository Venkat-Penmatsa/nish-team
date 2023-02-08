import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  warningDesc:string;

  displayedColumns: string[] = ['monthName',
    'compHouse',
    'compTravelPass',
    'compOthers',
    'totalAllowanceApplied',
    'comments',
    'uploadedBy',
    'updateDate'];

  applieMobilityMonths: ApplieMobilityMonths[] = [];
  dataSource = new MatTableDataSource<ApplieMobilityMonths>(this.applieMobilityMonths);
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

  fetchMobilityDetails(event) {
    console.log("fetching based on date ");
    this.getMobilityDetails();
  }

  getMobilityDetails() {

    this.message = false;
    this.error = false;
    this.mobilitySecFlag = false;
    this.warningDesc ="";
    this.mobilityForm.reset();
    this.monthMobilityForm.reset();

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

      this.warningDesc = res.warningDescription;
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

    this.fetchAllMonthsMobility();

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchAllMonthsMobility(): any {

    const emparr = this.empName.split("-");
    const selectedDat = moment(this.yearSelected.value).format("DD-MM-YYYY");
    this.applieMobilityMonths = [];
    this.dataSource = new MatTableDataSource<ApplieMobilityMonths>(this.applieMobilityMonths);
    this.mobilityService.fetchEmpAllMonthsMobility(emparr[0], selectedDat).subscribe(res => {
      console.log(res);
      res.forEach(e => {
        this.applieMobilityMonths.push(new ApplieMobilityMonths(e.monthName,
          e.compHouse,
          e.compTravelPass,
          e.compOthers,
          e.totalAllowanceApplied,
          e.comments,
          e.uploadedBy,
          e.updateDate));
      })
      this.dataSource = new MatTableDataSource<ApplieMobilityMonths>(this.applieMobilityMonths);
      this.dataSource.paginator = this.paginator;
    });
    return "Success";
  }



}


export class ApplieMobilityMonths {
  constructor(
    private monthName: string,
    private compHouse: number,
    private compTravelPass: number,
    private compOthers: number,
    private totalAllowanceApplied: number,
    private comments: string,
    private updatedBy: string,
    private updateDate: Date
  ) { }
}
