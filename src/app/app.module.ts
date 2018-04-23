import { CompaniesService } from './components/services/companies.service';
import { AuthGuard } from './components/auth/auth-guard.service';
import { AuthService } from './components/auth/auth.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { UtilitiesService } from './utilities/utilities.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { AboutComponent } from './components/about/about.component';
import { UserService } from "./components/user-service/user.service";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/not-found/pageNotFound.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AssessmentComponent } from "./components/assessment/assessment.component";
import { ResourcesComponent } from "./components/resources/resources.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { DimensionsComponent } from "./components/dimensions/dimensions.component";
import { SurveyService } from "./components/a-survey/survey.service";
import { ActionComponent } from "./components/action/action.component";
import { AssessmentService } from "./components/assessment/assessment.service";
import { TflGuideComponent } from "./components/tfl-guide/tfl-guide.component";
import { DataJunkieComponent } from "./components/data-junkie/data-junkie.component";

import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/layout/header.component";
import { RouterModule } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { MyFilterPipe } from "./components/pipes/filter.pipe";
import { TitleCasePipe } from "./components/pipes/titlecase.pipe";
import { ModalSurveyComponent } from "./components/modals/modalSurveyComponent";
import { ModalTFLGuideComponent } from "./components/modals/modalTFLGuideComponent";
import { ModalYourResultsComponent } from "./components/modals/modalYourResultsComponent";
import { ModalDataJunkieComponent } from "./components/modals/modalDataJunkieComponent";
import { ModalDashboardComponent } from "./components/modals/modalDashboardComponent";
import { ModalGenericComponent } from "./components/modals/modalGenericComponent";
import { AppleChartComponent } from "./components/charts/appleChart.component";
import { BarChartComponent } from "./components/charts/barChart.component";
import { SimpleChartComponent } from "./components/charts/simpleChart.component";
import { DonutChartComponent } from "./components/charts/donutChart.component";
import { WhenCreateView } from "./components/dimensions/oncreateview";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminService } from "./components/admin/admin.service";
import { SurveyFilterPipe } from "./components/pipes/surveyFilter.pipe";
import { ModalTFLChartComponent } from "./components/modals/modalTFLChartComponent";
import { DimensionService } from "./components/dimension-service/dimension.service";
import { AlertModule } from "ngx-bootstrap";
import { GaugeComponent } from "./components/charts/guage.component";
import { StressPage } from "./components/pages/stress";
import { OrderByPipe } from "./components/pipes/orderBy.pipe";
import { ContractComponent } from "./components/contract/contract.component";
import {TextMaskModule} from 'angular2-text-mask';
import { ASurveyComponent } from './components/a-survey/survey.component';
import { ADimensionsComponent } from './components/a-dimensions/a-dimensions.component';
import { AAssessmentComponent } from './components/a-assessment/a-assessment.component';
import { AStressComponent } from './components/a-stress/a-stress.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserFilterPipe } from './pipes/user-filter.pipe'



@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    AboutComponent,
    LogoutComponent,
    ResourcesComponent,
    HomeComponent,
    AssessmentComponent,
    DashboardComponent,
    ActionComponent,
    LoginComponent,
    TflGuideComponent,
    DataJunkieComponent,
    DimensionsComponent,
    PageNotFoundComponent,
    HeaderComponent,
    UserComponent,
    MyFilterPipe,
    TitleCasePipe,
    ModalSurveyComponent,
    ModalTFLChartComponent,
    ModalTFLGuideComponent,
    ModalYourResultsComponent,
    ModalDataJunkieComponent,
    ModalDashboardComponent,
    ModalGenericComponent,
    AppleChartComponent,
    BarChartComponent,
    SimpleChartComponent,
    GaugeComponent,
    DonutChartComponent,
    WhenCreateView,
    AdminComponent,
    SurveyFilterPipe,
    StressPage,
    OrderByPipe,
    ContractComponent,
    ASurveyComponent,
    ADimensionsComponent,
    AAssessmentComponent,
    AStressComponent,
    ForgotPasswordComponent,
    UserFilterPipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2BootstrapModule,
    TextMaskModule,
    UtilitiesModule,
    RouterModule,
    HttpModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot()


  ],
  providers: [
    UtilitiesService,
    AuthService,
    UserService,
    AuthGuard,
    AssessmentService,
    DimensionService,
    SurveyService,
    AdminService,
    CompaniesService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

