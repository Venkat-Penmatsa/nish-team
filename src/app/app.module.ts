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
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AssetDetailsComponent,
    ApplyLeavesComponent,
    LeavesHistoryComponent,
    TimesheetComponent,
    ForbiddenComponent,
    HeaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
