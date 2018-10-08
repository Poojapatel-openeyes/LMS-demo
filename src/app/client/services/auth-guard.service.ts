import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
declare var $: any;

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService,private router: Router, public globals: Globals) { }

  canActivate(route,state:RouterStateSnapshot) { 

	  this.globals.currentLink=state.url;
	 	
	

	  if(this.authService.isLoggedIn()==true){
		
		
			if(state.url.split('/')[2] != undefined){
				this.globals.currentLink = '/'+state.url.split('/')[1]+'/'+state.url.split('/')[2];
			} else {
				this.globals.currentLink = '/'+state.url.split('/')[1];
			} 
			
		  if(state.url=='/login'|| state.url=='/userrequest/add' || (state.url.split('/')[1]=='user' && state.url.split('/')[2]=='edit') || state.url=='/openregister/add' ||  (state.url.split('/')[1]=='register' && state.url.split('/')[2]==undefined)||state.url=='/invitation'||state.url=='/'||state.url=='/forgotpassword'||state.url.split('/')[1]=='resetpass'|| state.url=='/home'){
			  //this.globals.IsLoggedIn = false;
			//  this.globals.IsLoggedIn = true;
			  this.router.navigate(['/dashboard']);
			  return false;
		  } else {
			//	this.globals.IsLoggedIn = true;
			return true;	  
		  }		  
	  } else {
		  //alert(state.url);
		   if(state.url=='/login' || state.url=='/userrequest/add' || (state.url.split('/')[1]=='user' && state.url.split('/')[2]=='edit') || state.url=='/openregister/add' || state.url.split('/')[1]=='resetpass' || state.url.split('/')[1]=='resetpass'||(state.url.split('/')[1]=='home' && state.url.split('/')[2]==undefined)||state.url=='/invitation'||state.url=='/forgotpassword'||state.url.split('/')[1]=='resetpass'||(state.url.split('/')[1]=='contactus' && state.url.split('/')[2]==undefined) || state.url=='/pagenotfound'|| state.url=='/home'){
		
			  if(state.url=='/login'){
				this.globals.check_login = true;
			  }			   
			   this.globals.IsLoggedIn = false;
			   return true;
		   } else {
			 //  this.globals.IsLoggedIn = false;
			   //this.router.navigate(['/login']);
			   window.location.href = '/home';
			   return false;
		   }		  
	  }
  }
  
}
