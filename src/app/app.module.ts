import { BrowserModule } from '@angular/platform-browser';
import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


//import { AuthGuard } from './services/auth-guard.service';
//import { AuthService } from './services/auth.service'
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//import { HomeComponent } from './home/home.component';
//import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent
    //HomeComponent,
    //DashboardComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	HttpClientModule,
	RouterModule.forRoot([	
		{
			path: 'admin',
			//canActivate: [AuthGuard],
			loadChildren: './admin/admin.module#AdminModule'
		},	
		{
			path: '',
			//canActivate: [AuthGuard],
			loadChildren: './client/client.module#ClientModule'
		}
	])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
