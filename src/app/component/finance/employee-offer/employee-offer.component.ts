import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AssetsType } from 'src/app/constants/assetsType';
import { User } from 'src/app/model/User';
import { AssetsService } from 'src/app/services/assets.service';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-employee-offer',
  templateUrl: './employee-offer.component.html',
  styleUrls: ['./employee-offer.component.css']
})
export class EmployeeOfferComponent implements OnInit {


  employeeName: any[] = [];
  disableBtn = false;
  empExpenses: any;
  successFlag = false;
  empName: any;
  user:User;
  totalExpPerMOnth: number;
  totalYearExpenses:number;
  constructor(private fb: UntypedFormBuilder, private timesheetService: TimesheetService) {

  }

  ngOnInit(): void {

  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  fetchEmpExpenses() {
    this.timesheetService.fetchEmployeeExpenses(this.empName).subscribe(data => {
      console.log("emp expenses " + data);
      this.empExpenses = data;
      this.employeeExpenses.patchValue({
        totalExpPerMOnth: this.empExpenses.totalExpPerMOnth,
        totalYearExpenses: this.empExpenses.totalYearExpenses,
        comments: this.empExpenses.comments,
        empExpId: this.empExpenses.empExpId,
        sal: this.empExpenses.sal,
        generalExpenses: this.empExpenses.generalExpenses,
        yearExpenses: this.empExpenses.yearExpenses
      });
    })
  }

  calculateExpenses() {

    const grossSal = this.employeeExpenses.controls['sal'].value.grossSal;
    const aduitorFee = this.employeeExpenses.controls['generalExpenses'].value.aduitorFee;
    const sdworksFee = this.employeeExpenses.controls['generalExpenses'].value.sdworksFee;
    const sodexoFee = this.employeeExpenses.controls['generalExpenses'].value.sodexoFee;
    const dkvinsurance = this.employeeExpenses.controls['generalExpenses'].value.dkvinsurance;
    const othersGeneralExp = this.employeeExpenses.controls['generalExpenses'].value.othersGeneralExp;

    this.totalExpPerMOnth = grossSal + aduitorFee + sdworksFee + sodexoFee + dkvinsurance + othersGeneralExp;

    this.totalYearExpenses = this.employeeExpenses.controls['yearExpenses'].value.ecoCoupons + 
              this.employeeExpenses.controls['yearExpenses'].value.otherYearExp;

    this.employeeExpenses.patchValue({
      totalExpPerMOnth: this.totalExpPerMOnth,
      totalYearExpenses: this.totalYearExpenses
    });
  }

  onSubmit() {

    this.user = JSON.parse(localStorage.getItem("userDetails")|| '{}') as User;

    console.log(this.employeeExpenses.value);
    this.employeeExpenses.patchValue({
      emp: this.empName,
      updatedBy : this.user.empId
    })
    const salJson = JSON.stringify(this.employeeExpenses.value);
    console.log('salJson ' + salJson);
    
    this.timesheetService.updateEmployeeExpenses(salJson).subscribe(data => {
      console.log("emp expenses " + data);
      this.empExpenses = data;
      this.successFlag = true;
      this.employeeExpenses.patchValue({
        totalExpPerMOnth: this.empExpenses.totalExpPerMOnth,
        totalYearExpenses: this.empExpenses.totalYearExpenses,
        comments: this.empExpenses.comments,
        empExpId: this.empExpenses.empExpId,
        sal: this.empExpenses.sal,
        generalExpenses: this.empExpenses.generalExpenses,
        yearExpenses: this.empExpenses.yearExpenses
      });
    })

  }

  employeeExpenses = this.fb.group({
    totalExpPerMOnth: ['', Validators.required],
    totalYearExpenses: ['', Validators.required],
    comments: [''],
    empExpId: [''],
    emp: [''],
    updatedBy: [''],
    sal: this.fb.group({
      grossSal: ['', Validators.required],
      netSal: ['', Validators.required],
      nsso: ['', Validators.required],
      advanceLevy: ['', Validators.required],
      sssContribution: ['', Validators.required],
      mealContribution: [],
      seasonTicketAllowance: ['', Validators.required],
      reimbursedExpenses: ['', Validators.required],
      othersal: ['', Validators.required]
    }
    ),
    generalExpenses: this.fb.group({
      aduitorFee: ['', Validators.required],
      sdworksFee: ['', Validators.required],
      sodexoFee: ['', Validators.required],
      dkvinsurance: ['', Validators.required],
      othersGeneralExp: ['', Validators.required],
    }
    ),
    yearExpenses: this.fb.group({
      ecoCoupons: ['', Validators.required],
      otherYearExp: ['', Validators.required],
    }
    )
  });

}
