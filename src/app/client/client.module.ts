import { BrowserModule } from '@angular/platform-browser';
import { Globals } from './globals';
import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component.module';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { HomeService } from './services/home.service';

import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';

//import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service'

import { UserComponent } from './user/user.component';

import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserprofileService } from './services/userprofile.service';

import { HeaderComponent } from './header/header.component';

import { UserrequestComponent } from './userrequest/userrequest.component';
import { UserrequestService } from './services/userrequest.service';


import { OpenregisterComponent } from './openregister/openregister.component';
import { OpenregisterService } from './services/openregister.service';



import { InvitationComponent } from './invitation/invitation.component';
import { InvitationService } from './services/invitation.service';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
 import { ForgotpasswordService } from './services/forgotpassword.service';

import { ResetpassComponent } from './resetpass/resetpass.component';
import { ResetpassService } from './services/resetpass.service';
 
import { ChangepassComponent } from './changepass/changepass.component';
import { ChangepassService } from './services/changepass.service';
 
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    ClientComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    UserrequestComponent,
    InvitationComponent,
    HeaderComponent,
    ForgotpasswordComponent,
    ResetpassComponent,
    ChangepassComponent,
    UserprofileComponent,
    OpenregisterComponent,
    DashboardComponent
  
  ],
  imports: [
  CommonModule,
	HttpModule,
	FormsModule,
	HttpClientModule,
	ClientRoutingModule	
  ]
})
export class ClientModule { }
