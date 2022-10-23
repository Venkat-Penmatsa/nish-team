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

const routes: Routes = [

  {path:'home', component: HomeComponent},
  {path:'user', component: EmpInfoComponent},
  {path:'login', component: LoginComponent},
  {path:'forbidden', component: ForbiddenComponent},
  {path:'admin', component: ApplyLeavesComponent},
  {path:'leavesHistory', component: LeavesHistoryComponent},
  {path:'timeSheet', component: TimesheetComponent},
  {path:'assets', component: AssetDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
