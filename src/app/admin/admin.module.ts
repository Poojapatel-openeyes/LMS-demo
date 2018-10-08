import { BrowserModule } from '@angular/platform-browser';
import { Component,NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service'

import { RegisterComponent } from './register/register.component';
import { RegisterService } from './services/register.service';
import { RegisterlistComponent } from './registerlist/registerlist.component';

import { IndustryComponent } from './industry/industry.component';
import { IndustrylistComponent } from './industrylist/industrylist.component';
import { IndustryService } from './services/Industry.service';

import { UserroleComponent } from './userrole/userrole.component';
import { UserrolelistComponent } from './userrolelist/userrolelist.component';
import { UserroleService } from './services/userrole.service';

import { CountryComponent } from './country/country.component';
import { CountrylistComponent } from './countrylist/countrylist.component';
import { CountryService } from './services/country.service';

import { DepartmentComponent } from './department/department.component';
import { DepartmentlistComponent } from './departmentlist/departmentlist.component';
import { DepartmentService } from './services/department.service';

import { StateComponent } from './state/state.component';
import { StatelistComponent } from './statelist/statelist.component';
import { StateService } from './services/state.service';

import { CompanyComponent } from './company/company.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { CompanyService } from './services/company.service';

import { SettingComponent } from './setting/setting.component';
import { SettinglistComponent } from './settinglist/settinglist.component';
import { SettingService } from './services/setting.service';

import { UserinviteComponent } from './userinvite/userinvite.component';
import { UserinvitelistComponent } from './userinvitelist/userinvitelist.component';

import { UserrequestComponent } from './userrequest/userrequest.component';
import { UserrequestlistComponent } from './userrequestlist/userrequestlist.component';
import { UserrequestService } from './services/userrequest.service';

import { UserrequestinviteService } from './services/userrequestinvite.service';

import { EmailtemplateComponent } from './emailtemplate/emailtemplate.component';
import { EmailtemplateListComponent } from './emailtemplate-list/emailtemplate-list.component';
import { EmailtemplateService } from './services/emailtemplate.service';

import { LoginlogComponent } from './loginlog/loginlog.component';
import { EmaillogComponent } from './emaillog/emaillog.component';
import { ActivitylogComponent } from './activitylog/activitylog.component';
import { AuditlogService } from './services/auditlog.service';



@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    IndustryComponent,
    RegisterlistComponent,
    IndustrylistComponent,
    UserroleComponent,
    UserrolelistComponent,
    CountryComponent,
    CountrylistComponent,
    DepartmentComponent,
    DepartmentlistComponent,
    StateComponent,
    StatelistComponent,
    CompanyComponent,
    CompanylistComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SettingComponent,
    SettinglistComponent,
    UserinviteComponent,
    UserrequestComponent,
    UserrequestlistComponent,
    UserinvitelistComponent,
    EmailtemplateComponent,
    EmailtemplateListComponent,
    LoginlogComponent,
    ActivitylogComponent,
    EmaillogComponent
  ],
  imports: [
	//BrowserModule,
	CommonModule,
	HttpModule,
	  FormsModule,
	  AdminRoutingModule
  ]  
})
export class AdminModule { }
