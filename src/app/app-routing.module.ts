import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { FeaturesComponent } from './component/features/features/features.component';
import { AddemployeeComponent } from './component/employee/addemployee/addemployee.component';
import { ListemployeeComponent } from './component/employee/listemployee/listemployee.component';
import { SearchemployeeComponent } from './component/employee/searchemployee/searchemployee.component';
import { NewcontractComponent } from './component/contract/newcontract/newcontract.component';
import { AllcontractsComponent } from './component/contract/allcontracts/allcontracts.component';
import { ApplyleaveComponent } from './component/Leaves/applyleave/applyleave.component';
import { LeavebalenceComponent } from './component/Leaves/leavebalence/leavebalence.component';
import { UploadComponent } from './common/upload/upload.component';
import { DependantComponent } from './component/modules/dependant/dependant.component';
import { NewAssetComponent } from './component/assets/new-asset/new-asset.component';
import { AssignAssetsComponent } from './component/assets/assign-assets/assign-assets.component';
import { AllAssetsComponent } from './component/assets/all-assets/all-assets.component';
import { UpdateAssetsComponent } from './component/assets/update-assets/update-assets.component';
import { AssetHistoryComponent } from './component/assets/asset-history/asset-history.component';
import {MonthWiseComponent} from "./component/timesheet/month-wise/month-wise.component";
import {YearWiseComponent} from "./component/timesheet/year-wise/year-wise.component";
import {HomeComponent} from "./component/home/home.component";
import {AuthGuard} from "./services/authguard";
import { ListusersComponent } from './component/userManagement/listusers/listusers.component';
import { UserComponent } from './component/userManagement/user/user.component';
import { ManageUserComponent } from './component/userManagement/manage-user/manage-user.component';
import { UpdateleavesComponent } from './component/Leaves/updateleaves/updateleaves.component';
import { ManageEmployeeComponent } from './component/employee/manage-employee/manage-employee.component';
import { AllEmpMonthlyLeaveReportComponent } from './component/timesheet/all-emp-monthly-leave-report/all-emp-monthly-leave-report.component';
import { EmployeeOfferComponent } from './component/finance/employee-offer/employee-offer.component';
import { MonthlyEmpReportComponent } from './component/finance/monthly-emp-report/monthly-emp-report.component';
import { YearlyEmpReportComponent } from './component/finance/yearly-emp-report/yearly-emp-report.component';
import { LeavescalculatebatchComponent } from './component/Leaves/leavescalculatebatch/leavescalculatebatch.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login'},

  {
    path: '',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
      { path: 'employee/NewEmployee', component: AddemployeeComponent },
      { path: 'employee/allEmployees', component: ListemployeeComponent },
      { path: 'employee/empManagement', component: ManageEmployeeComponent },
      { path: 'contracts/newContract', component: NewcontractComponent },
      { path: 'contracts/allContracts', component: AllcontractsComponent },
      { path: 'finance/empOffer', component: EmployeeOfferComponent },
      { path: 'finance/employeesMonthlyReport', component: MonthlyEmpReportComponent },
      { path: 'finance/empYearlyReport', component: YearlyEmpReportComponent },
      { path: 'hr/applyLeaves', component: ApplyleaveComponent },
      { path: 'hr/leavesBalence', component: LeavebalenceComponent },
      { path: 'hr/updateLeaves', component: UpdateleavesComponent },
      { path: 'hr/monthlyTimesheet', component: MonthWiseComponent },
      { path: 'hr/yearlyTimesheet', component: YearWiseComponent },
      { path: 'hr/generateMontlyTimeSheetReports', component: AllEmpMonthlyLeaveReportComponent },
      { path: 'hr/batchJob', component: LeavescalculatebatchComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'assets/newAsset', component: NewAssetComponent },
      { path: 'dependent', component: DependantComponent },
      { path: 'assets/allAssets', component: AllAssetsComponent },
      { path: 'assets/updateAssets', component: UpdateAssetsComponent },
      { path: 'assets/assetHistory', component: AssetHistoryComponent },
      { path: 'user/manageUser', component: ManageUserComponent },
      { path: 'user/usersList', component: ListusersComponent },
      { path: 'user/newUser', component: UserComponent },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
