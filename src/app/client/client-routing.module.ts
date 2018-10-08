import { BrowserModule } from '@angular/platform-browser';
import { Globals } from './globals';
import { Component,NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { ClientComponent  } from './client.component.module';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { HomeService } from './services/home.service';

import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

import { HeaderComponent } from './header/header.component';

import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';

import { OpenregisterComponent } from './openregister/openregister.component';
import { OpenregisterService } from './services/openregister.service';


import { UserrequestComponent } from './userrequest/userrequest.component';
import { UserrequestService } from './services/userrequest.service';

import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserprofileService } from './services/userprofile.service';


import { InvitationComponent } from './invitation/invitation.component';
import { InvitationService } from './services/invitation.service';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordService } from './services/forgotpassword.service';

import { ResetpassComponent } from './resetpass/resetpass.component';
import { ResetpassService } from './services/resetpass.service';

import { ChangepassComponent } from './changepass/changepass.component';
import { ChangepassService } from './services/changepass.service';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [	
	{
		path: '',
			component: ClientComponent,
			children: [
				
				{ path : '', component : HomeComponent ,canActivate : [AuthGuard] },
			//	{ path : '', redirectTo: 'home', pathMatch:'full'},

				//{ path: '**', redirectTo : 'dashboard' },

				{ path: 'dashboard', component : DashboardComponent,canActivate : [AuthGuard] },

				{ path : 'home', component : HomeComponent, canActivate : [AuthGuard] },

				{ path : 'login', component : LoginComponent ,canActivate : [AuthGuard]},

				{ path : 'openregister/add', component : OpenregisterComponent ,canActivate : [AuthGuard]},

				// { path : 'user/add', component : UserComponent  },
				{ path : 'user/edit/:id', component : UserComponent,canActivate : [AuthGuard] },

				{ path : 'userprofile/edit/:id', component : UserprofileComponent ,canActivate : [AuthGuard]},

				{ path : 'userrequest/add', component : UserrequestComponent  ,canActivate : [AuthGuard]},
			
				{ path : 'invitation/add', component : InvitationComponent ,canActivate : [AuthGuard]},

				{ path : 'forgotpassword', component : ForgotpasswordComponent  ,canActivate : [AuthGuard]},

				{ path : 'resetpass/:id', component : ResetpassComponent ,canActivate : [AuthGuard]},

				{ path : 'changepass', component : ChangepassComponent,canActivate : [AuthGuard] },
				
			]
	}
];
  
 @NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [Globals,AuthService,AuthGuard,HomeService,UserrequestService,InvitationService,UserService,LoginService,ForgotpasswordService,ResetpassService,ChangepassService,
		UserprofileService,OpenregisterService
	
	],

	bootstrap: [ClientComponent]
})
export class ClientRoutingModule { }
