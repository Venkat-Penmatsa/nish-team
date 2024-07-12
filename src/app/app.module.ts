import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login/login.component';
import { HomeComponent } from './component/home/home/home.component';
import { AssetDetailsComponent } from './component/assets/asset-details/asset-details.component';
import { ApplyLeavesComponent } from './component/leaves/apply-leaves/apply-leaves.component';
import { LeavesHistoryComponent } from './component/leaves/leaves-history/leaves-history.component';
import { TimesheetComponent } from './component/timesheet/timesheet/timesheet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ForbiddenComponent } from './component/login/forbidden/forbidden.component';
import { HeaderComponent } from './component/home/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
import { EmpInfoComponent } from './component/empInfo/emp-info/emp-info.component';
import { HolidayListComponent } from './component/leaves/holiday-list/holiday-list.component';
import { EmpDetailsComponent } from './component/empInfo/emp-details/emp-details.component';
import { NotificationComponent } from './component/notification/notification/notification.component';
import { LeavesOverviewComponent } from './component/leaves/leaves-overview/leaves-overview.component';
import { FormattedDatePipe } from './common/FormattedDatePipe';
import { MobilitydetailsComponent } from './component/mobility/mobilitydetails/mobilitydetails.component';
import { MobilityhistoryComponent } from './component/mobility/mobilityhistory/mobilityhistory.component';
import { ChangePwdComponent } from './component/login/change-pwd/change-pwd.component';
import { FillTimesheetComponent } from './component/timesheet/fill-timesheet/fill-timesheet.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadrSelectDirective } from './component/timesheet/fill-timesheet/uploadr-select.directive';
import { NotificationService } from './services/notification.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CarPolicyComponent } from './component/mobility/car-policy/car-policy.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    EmpInfoComponent,
    LoginComponent,
    HomeComponent,
    AssetDetailsComponent,
    ApplyLeavesComponent,
    LeavesHistoryComponent,
    TimesheetComponent,
    ForbiddenComponent,
    HeaderComponent,
    HolidayListComponent,
    EmpDetailsComponent,
    NotificationComponent,
    LeavesOverviewComponent,
    FormattedDatePipe,
    MobilitydetailsComponent,
    MobilityhistoryComponent,
    ChangePwdComponent,
    FillTimesheetComponent,
    UploadrSelectDirective,
    CarPolicyComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    FileUploadModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    // JwtModule.forRoot({}),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
