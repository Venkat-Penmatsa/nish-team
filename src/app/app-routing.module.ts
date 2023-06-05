import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { FeaturesComponent } from './component/features/features/features.component';
import { AddemployeeComponent } from './component/employee/addemployee/addemployee.component';
import { ListemployeeComponent } from './component/employee/listemployee/listemployee.component';
import { NewcontractComponent } from './component/contract/newcontract/newcontract.component';
import { AllcontractsComponent } from './component/contract/allcontracts/allcontracts.component';
import { ApplyleaveComponent } from './component/Leaves/applyleave/applyleave.component';
import { LeavebalenceComponent } from './component/Leaves/leavebalence/leavebalence.component';
import { UploadComponent } from './common/upload/upload.component';
import { DependantComponent } from './component/modules/dependant/dependant.component';
import { NewAssetComponent } from './component/assets/new-asset/new-asset.component';
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
import { YearlyEmpReportComponent } from './component/finance/yearly-emp-report/yearly-emp-report.component';
import { LeavescalculatebatchComponent } from './component/Leaves/leavescalculatebatch/leavescalculatebatch.component';
import { EmpOfferSimulationComponent } from './component/finance/emp-offer-simulation/emp-offer-simulation.component';
import { PasswordResetComponent } from './component/features/password-reset/password-reset.component';
import { ManageDocumentsComponent } from './component/documents/manage-documents/manage-documents.component';
import { DisplayTasksComponent } from './component/tasks/display-tasks/display-tasks.component';
import { EmpTimesheetReportComponent } from './component/emptimesheet/emp-timesheet-report/emp-timesheet-report.component';
import { FillEmpTimesheetComponent } from './component/emptimesheet/fill-emp-timesheet/fill-emp-timesheet.component';
import { AddmobilityComponent } from './component/mobility/addmobility/addmobility.component';
import { MonthmobilityComponent } from './component/mobility/monthmobility/monthmobility.component';
import { MobilityreportComponent } from './component/mobility/mobilityreport/mobilityreport.component';
import { MobilitybatchComponent } from './component/mobility/mobilitybatch/mobilitybatch.component';
import { ContractBasedTimesheetComponent } from './component/timesheet/contract-based-timesheet/contract-based-timesheet.component';
import { ManageClientComponent } from './component/client/manage-client/manage-client.component';
import { ListAllClientsComponent } from './component/client/list-all-clients/list-all-clients.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login'},

  {
    path: '',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: DisplayTasksComponent},
      { path: 'employee/NewEmployee', component: AddemployeeComponent },
      { path: 'employee/allEmployees', component: ListemployeeComponent },
      { path: 'employee/empManagement', component: ManageEmployeeComponent },
      { path: 'contracts/newContract', component: NewcontractComponent },
      { path: 'contracts/allContracts', component: AllcontractsComponent },
      { path: 'finance/empOffer', component: EmployeeOfferComponent },
      { path: 'finance/empYearlyReport', component: YearlyEmpReportComponent },
      { path: 'finance/simulation', component: EmpOfferSimulationComponent },
      { path: 'hr/applyLeaves', component: ApplyleaveComponent },
      { path: 'hr/leavesBalence', component: LeavebalenceComponent },
      { path: 'hr/updateLeaves', component: UpdateleavesComponent },
      { path: 'hr/monthlyTimesheet', component: MonthWiseComponent },
      { path: 'hr/yearlyTimesheet', component: YearWiseComponent },
      { path: 'hr/generateMontlyTimeSheetReports', component: AllEmpMonthlyLeaveReportComponent },
      { path: 'hr/generateContractBasedTimeSheetReport', component: ContractBasedTimesheetComponent},
      { path: 'hr/batchJob', component: LeavescalculatebatchComponent },
      { path: 'mobility/manageMobility', component: AddmobilityComponent },
      { path: 'mobility/monthMobility', component: MonthmobilityComponent },
      { path: 'mobility/mobilityReport', component: MobilityreportComponent },
      { path: 'mobility/mobilityBatch', component: MobilitybatchComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'assets/newAsset', component: NewAssetComponent },
      { path: 'dependent', component: DependantComponent },
      { path: 'assets/allAssets', component: AllAssetsComponent },
      { path: 'assets/updateAssets', component: UpdateAssetsComponent },
      { path: 'assets/assetHistory', component: AssetHistoryComponent },
      { path: 'document/manageDocuments', component: ManageDocumentsComponent },
      { path: 'user/manageUser', component: ManageUserComponent },
      { path: 'user/usersList', component: ListusersComponent },
      { path: 'user/newUser', component: UserComponent },
      { path: 'changepwd', component: PasswordResetComponent },
      { path: 'user/empManage', component: ManageUserComponent },
      { path: 'emptimesheet/filltimesheet', component: FillEmpTimesheetComponent },
      { path: 'emptimesheet/allemptimesheet', component: EmpTimesheetReportComponent },
      { path: 'client/manageClient', component: ManageClientComponent },
      { path: 'client/allClients', component: ListAllClientsComponent },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
