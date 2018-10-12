import { AdminViewUserComponent } from './../components/admin-view-user/admin-view-user.component';
import { AboutComponent } from './../components/about/about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {PageNotFoundComponent} from "./../components/not-found/pageNotFound.component";
import {HomeComponent} from "./../components/home/home.component";
import {DashboardComponent} from "./../components/dashboard/dashboard.component";
import {AssessmentComponent} from "./../components/assessment/assessment.component";
import {ResourcesComponent} from "./../components/resources/resources.component";
import {LogoutComponent} from "./../components/logout/logout.component";
import {AuthGuard} from "./../components/auth/auth-guard.service";
import {LoginComponent} from "./../components/login/login.component";
import {DimensionsComponent} from "./../components/dimensions/dimensions.component";
import {TflGuideComponent} from "./../components/tfl-guide/tfl-guide.component";
import {DataJunkieComponent} from "./../components/data-junkie/data-junkie.component";
import {AdminComponent} from "./../components/admin/admin.component";
import {StressPage} from "./../components/pages/stress";
import {ContractComponent} from "./../components/contract/contract.component";
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

var routes:Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'dashboard/:user_id/:assessment_id', component: DashboardComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password/:email/:code', component: ForgotPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'resources', component: ResourcesComponent},
  { path: 'assessment', component: AssessmentComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'tfl-guide/:user_id/:assessment_id', component: TflGuideComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'tfl-guide', component: TflGuideComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'data-junkie/:user_id/:assessment_id', component: DataJunkieComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'data-junkie', component: DataJunkieComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'admin-view-user/:user_id', component: AdminViewUserComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'contract', component: ContractComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},

  { path: 'dimensions/:user_id/:assessment_id/:dimension_id', component: DimensionsComponent},

  { path: 'stress', component: StressPage},

  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
