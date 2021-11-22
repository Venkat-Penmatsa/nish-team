import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetsType } from 'src/app/constants/assetsType';
import { map, startWith } from 'rxjs/operators';
import { AssetsService } from 'src/app/services/assets.service';
import { LeavesService } from 'src/app/services/leaves.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-updateleaves',
  templateUrl: './updateleaves.component.html',
  styleUrls: ['./updateleaves.component.css']
})
export class UpdateleavesComponent implements OnInit {

  selectUpdateCategory: string;
  employeeName: any[] = [];
  filterEmpName: string;
  disableBtn = false;
  successFlag = false;
  empName: any;
  user:User;
  
  constructor(private fb: FormBuilder, private leavesService: LeavesService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userDetails")|| '{}') as User;
  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }


  fetchLeaves() {

    if (this.empName != "") {
      this.updateLeavesForm.reset();
      this.leavesService.fetchEmpLeaves(this.empName).subscribe(res => {
        console.log("data ==========> " + res);

        this.updateLeavesForm.patchValue({
          leavebalenceid: res.leavebalenceid,
          employeeId: res.employeeId,
          rttAdv: res.rttAdv,
          authorisedAbsence: res.authorisedAbsence,
          other: res.other,
          parentalLeave: res.parentalLeave,
          maternityLeave: res.maternityLeave,
          totalleavebalence: res.totalleavebalence,
          updatedBy: res.updatedBy,
          comments: res.comments
        });
      })
    }
  }

  UpdateLeaves() {

    console.log(this.updateLeavesForm.value);
    this.updateLeavesForm.patchValue({
      updatedBy: this.user.empId
    })
    const assetJson = JSON.stringify(this.updateLeavesForm.value);
    console.log('assetJson ' + assetJson);

    this.leavesService.updateEmpLeaves(assetJson)
      .subscribe(data => {
        console.log("data ==========> " + data);
        let serviceResponse = data;
        this.successFlag = true;
      })
  }

  updateLeavesForm = this.fb.group({
    leavebalenceid: ['', Validators.required],
    employeeId: ['', Validators.required],
    rttAdv: ['',],
    authorisedAbsence: [''],
    other: ['',],
    parentalLeave: ['',],
    maternityLeave: ['',],
    totalleavebalence: ['',],
    updatedBy: ['',],
    comments: []
  });

}
