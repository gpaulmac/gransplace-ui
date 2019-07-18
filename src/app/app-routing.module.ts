import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { DashboradComponent } from './dashborad/dashborad.component';

// path and component for Routing
const routes: Routes = [
  {path: '', component: DashboradComponent, pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'dashborad', component: DashboradComponent, canActivate: [AuthGuardService] }, //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }