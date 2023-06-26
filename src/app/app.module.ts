import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
import { FeaturesComponent } from './component/features/features/features.component';
import { AddemployeeComponent } from './component/employee/addemployee/addemployee.component';
import { ListemployeeComponent } from './component/employee/listemployee/listemployee.component';
import { NewcontractComponent } from './component/contract/newcontract/newcontract.component';
import { AllcontractsComponent } from './component/contract/allcontracts/allcontracts.component';
import { ApplyleaveComponent } from './component/Leaves/applyleave/applyleave.component';
import { LeavebalenceComponent } from './component/Leaves/leavebalence/leavebalence.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from './common/dateformat';
import { UploadDirective } from './directives/upload.directive';
import { UploadComponent } from './common/upload/upload.component';
import { ProgressComponent } from './common/progress/progress.component';
import { AddDependantComponent } from './component/modules/dialog-box/add-dependant/add-dependant.component';
import { FormsModule } from '@angular/forms';
import { DeleteDependantComponent } from './component/modules/dialog-box/delete-dependant/delete-dependant.component';
import { EditDependantComponent } from './component/modules/dialog-box/edit-dependant/edit-dependant.component';
import { DependantComponent } from './component/modules/dependant/dependant.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MessageComponent } from './common/message/message.component';
import { NewAssetComponent } from './component/assets/new-asset/new-asset.component';
import { AllAssetsComponent } from './component/assets/all-assets/all-assets.component';
import { EmpNameComponent } from './common/emp-name/emp-name.component';
import { UpdateAssetsComponent } from './component/assets/update-assets/update-assets.component';
import { AssetHistoryComponent } from './component/assets/asset-history/asset-history.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MonthWiseComponent} from "./component/timesheet/month-wise/month-wise.component";
import {YearWiseComponent} from "./component/timesheet/year-wise/year-wise.component";
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/userManagement/user/user.component';
import { ListusersComponent } from './component/userManagement/listusers/listusers.component';
import { ManageUserComponent } from './component/userManagement/manage-user/manage-user.component';
import { UpdateleavesComponent } from './component/Leaves/updateleaves/updateleaves.component';
import { ManageEmployeeComponent } from './component/employee/manage-employee/manage-employee.component';
import { AllEmpMonthlyLeaveReportComponent } from './component/timesheet/all-emp-monthly-leave-report/all-emp-monthly-leave-report.component';
import { YearlyEmpReportComponent } from './component/finance/yearly-emp-report/yearly-emp-report.component';
import { EmployeeOfferComponent } from './component/finance/employee-offer/employee-offer.component';
import { LeavescalculatebatchComponent } from './component/Leaves/leavescalculatebatch/leavescalculatebatch.component';
import { EmpOfferSimulationComponent } from './component/finance/emp-offer-simulation/emp-offer-simulation.component';
import { PasswordResetComponent } from './component/features/password-reset/password-reset.component';
import { MatMomentDateModule,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ManageDocumentsComponent } from './component/documents/manage-documents/manage-documents.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NetworkInterceptorService } from './services/network-interceptor.service';
import { DisplayTasksComponent } from './component/tasks/display-tasks/display-tasks.component';
import { FillEmpTimesheetComponent } from './component/emptimesheet/fill-emp-timesheet/fill-emp-timesheet.component';
import { EmpTimesheetReportComponent } from './component/emptimesheet/emp-timesheet-report/emp-timesheet-report.component';
import { AddmobilityComponent } from './component/mobility/addmobility/addmobility.component';
import { MonthmobilityComponent } from './component/mobility/monthmobility/monthmobility.component';
import { MobilityreportComponent } from './component/mobility/mobilityreport/mobilityreport.component';
import { MobilitybatchComponent } from './component/mobility/mobilitybatch/mobilitybatch.component';
import { ContractBasedTimesheetComponent } from './component/timesheet/contract-based-timesheet/contract-based-timesheet.component';
import { ActiveEmpComponent } from './common/active-emp/active-emp.component';
import { ManageClientComponent } from './component/client/manage-client/manage-client.component';
import { ListAllClientsComponent } from './component/client/list-all-clients/list-all-clients.component';
import { CustomerNameComponent } from './common/customer-name/customer-name.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    FeaturesComponent,
    AddemployeeComponent,
    ListemployeeComponent,
    NewcontractComponent,
    AllcontractsComponent,
    ApplyleaveComponent,
    LeavebalenceComponent,
    UploadDirective,
    UploadComponent,
    ProgressComponent,
    AddDependantComponent,
    DeleteDependantComponent,
    EditDependantComponent,
    DependantComponent,
    MessageComponent,
    NewAssetComponent,
    AllAssetsComponent,
    EmpNameComponent,
    UpdateAssetsComponent,
    MonthWiseComponent,
    YearWiseComponent,
    HomeComponent,
    AssetHistoryComponent,
    UserComponent,
    ListusersComponent,
    ManageUserComponent,
    UpdateleavesComponent,
    ManageEmployeeComponent,
    AllEmpMonthlyLeaveReportComponent,
    YearlyEmpReportComponent,
    EmployeeOfferComponent,
    LeavescalculatebatchComponent,
    EmpOfferSimulationComponent,
    PasswordResetComponent,
    ManageDocumentsComponent,
    DisplayTasksComponent,
    FillEmpTimesheetComponent,
    EmpTimesheetReportComponent,
    AddmobilityComponent,
    MonthmobilityComponent,
    MobilityreportComponent,
    MobilitybatchComponent,
    ContractBasedTimesheetComponent,
    ActiveEmpComponent,
    ManageClientComponent,
    ListAllClientsComponent,
    CustomerNameComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,FileUploadModule,MatButtonToggleModule,
    MatDatepickerModule, MatMomentDateModule,MatProgressSpinnerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptorService, multi: true },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
