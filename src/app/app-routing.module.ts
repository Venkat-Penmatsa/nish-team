import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDetailsComponent } from './component/assets/asset-details/asset-details.component';
import { EmpInfoComponent } from './component/empInfo/emp-info/emp-info.component';
import { HomeComponent } from './component/home/home/home.component';
import { ApplyLeavesComponent } from './component/leaves/apply-leaves/apply-leaves.component';
import { LeavesHistoryComponent } from './component/leaves/leaves-history/leaves-history.component';
import { ForbiddenComponent } from './component/login/forbidden/forbidden.component';
import { LoginComponent } from './component/login/login/login.component';
import { TimesheetComponent } from './component/timesheet/timesheet/timesheet.component';
import { AuthGuard } from './services/authguard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'user', component: EmpInfoComponent, canActivate: [AuthGuard] },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin', component: ApplyLeavesComponent, canActivate: [AuthGuard] },
  {
    path: 'leavesHistory',
    component: LeavesHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'timeSheet',
    component: TimesheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assets',
    component: AssetDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
