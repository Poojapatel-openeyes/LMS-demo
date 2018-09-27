import { BrowserModule } from '@angular/platform-browser';
import { Component,NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { AdminComponent  } from './admin.component.module';
import { Globals } from './globals';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service'

import { RegisterComponent } from './register/register.component';
import { RegisterlistComponent } from './registerlist/registerlist.component';
import { RegisterService } from './services/register.service';

import { IndustryComponent } from './industry/industry.component';
import { IndustrylistComponent } from './industrylist/industrylist.component';
import { IndustryService } from './services/industry.service';

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

const routes: Routes = [	
  {
    path: '',
        component: AdminComponent,
        children: [
		  
              { path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuard] },

              { path : 'login', component : LoginComponent ,canActivate : [AuthGuard] },

              { path : 'register/add', component : RegisterComponent ,canActivate : [AuthGuard] },
              { path : 'register/list', component : RegisterlistComponent ,canActivate : [AuthGuard] },
              { path : 'register/edit/:id', component : RegisterComponent ,canActivate : [AuthGuard]},

              { path : 'userrole/add', component : UserroleComponent ,canActivate : [AuthGuard] },
              { path : 'userrole/list', component : UserrolelistComponent ,canActivate : [AuthGuard]},
              { path : 'userrole/edit/:id', component : UserroleComponent ,canActivate : [AuthGuard]},

              { path : 'industry/add', component : IndustryComponent ,canActivate : [AuthGuard]},
              { path : 'industry/list', component : IndustrylistComponent ,canActivate : [AuthGuard]},
              { path : 'industry/edit/:id', component : IndustryComponent ,canActivate : [AuthGuard]},

              { path : 'department/add', component : DepartmentComponent ,canActivate : [AuthGuard]},
              { path : 'department/list', component : DepartmentlistComponent ,canActivate : [AuthGuard]},
              { path : 'department/edit/:id', component : DepartmentComponent,canActivate : [AuthGuard] },

              { path : 'country/add', component : CountryComponent ,canActivate : [AuthGuard]},
              { path : 'country/list', component : CountrylistComponent ,canActivate : [AuthGuard]},
              { path : 'country/edit/:id', component : CountryComponent ,canActivate : [AuthGuard]},

              { path : 'state/add', component : StateComponent ,canActivate : [AuthGuard]},
              { path : 'state/list', component : StatelistComponent ,canActivate : [AuthGuard]},
              { path : 'state/edit/:id', component : StateComponent ,canActivate : [AuthGuard]},

              { path : 'company/add', component : CompanyComponent ,canActivate : [AuthGuard]},
              { path : 'company/list', component : CompanylistComponent ,canActivate : [AuthGuard]},
              { path : 'company/edit/:id', component : CompanyComponent ,canActivate : [AuthGuard]},

              { path : 'setting/add', component : SettingComponent ,canActivate : [AuthGuard]},
              { path : 'setting/list', component : SettinglistComponent ,canActivate : [AuthGuard]},
              { path : 'setting/edit/:id', component : SettingComponent ,canActivate : [AuthGuard]},
              
              { path : 'userinvite/add', component : UserinviteComponent ,canActivate : [AuthGuard]},
              { path : 'userinvite/list', component : UserinvitelistComponent,canActivate : [AuthGuard] },

              { path : 'userrequest/add', component : UserrequestComponent ,canActivate : [AuthGuard]},
              { path : 'userrequest/list', component : UserrequestlistComponent ,canActivate : [AuthGuard]},
              { path : 'userrequest/edit/:id', component : UserrequestComponent ,canActivate : [AuthGuard]},
              
              { path : 'emailtemplate/add', component : EmailtemplateComponent ,canActivate : [AuthGuard]},
              { path : 'emailtemplate/list', component : EmailtemplateListComponent ,canActivate : [AuthGuard]},
              { path : 'emailtemplate/edit/:id', component : EmailtemplateComponent ,canActivate : [AuthGuard]}
            

        ]
  }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
 
  providers: [Globals,AuthService,AuthGuard,DashboardService,RegisterService,IndustryService,UserroleService,CountryService,DepartmentService,StateService,CompanyService,SettingService,
    UserrequestService,EmailtemplateService,UserrequestinviteService
  ],
  bootstrap: [AdminComponent]
})
export class AdminRoutingModule  { }
