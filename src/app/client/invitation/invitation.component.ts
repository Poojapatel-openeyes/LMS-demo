import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation.service';
declare var $;

@Component({
  selector: 'app-invitation',
  providers: [ InvitationService ],
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  InvitationEntity;
	submitted;
	btn_disable;
	header;
	type;
	message;
	msgflag;
  constructor( private http: Http,public globals: Globals, private router: Router, private InvitationService: InvitationService,private route:ActivatedRoute) { }

  ngOnInit() 
  {
	
  debugger
	 
	    this.InvitationEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	if(id){
	 
	} else {
		this.header = '';
    this.InvitationEntity = {};
	this.InvitationEntity.UserId = 0;
	this.InvitationEntity.IsActive = '1';
	
	}

  }
  
  
  
  addInvitation(InvitationForm)
	{		
	debugger
		
			this.submitted = true;
		
		if(InvitationForm.valid){
			this.InvitationEntity.Code=this.InvitationEntity.code1;
		
			this.btn_disable = true;
			
			 this.InvitationEntity.Code=this.InvitationEntity.Code.toUpperCase();
			this.InvitationService.add(this.InvitationEntity)
			.then((data) => 
			{ 
			
			
					
					
		    if(data=='days')
				{
					// this.globals.message = 'Your invitation code has expired!';
					// 	this.globals.type = 'danger';
					// 	this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}else if(data=='revoked')
				{
					this.globals.message = 'Your access has been revoked!';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}
				else if(data=='email')
				{
					this.globals.message = "It seem either you have entered wrong invitation code or you have not invited yet. Please use other invitation code if you have or <a href='/contactus'> contact us</a> to be invited";
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}
				else if(data=='code')
				{
					this.globals.message = 'Please enter valid invitation code!';
					this.globals.type = 'danger';
					this.globals.msgflag = true;
					this.btn_disable = false;
					this.submitted = false;
				//this.router.navigate(['/register']);
				
					
				}else
				{
					var UserId=data[0]['UserId'];
					
					// var Sales_Assign=data[0]['Sales_Assign'];
					// localStorage.setItem('Sales_Assign',Sales_Assign);
					this.btn_disable = false;
					this.submitted = false;
				//	localStorage.setItem('UserId',this.InvitationEntity.UserId);
					localStorage.setItem('UserId',this.InvitationEntity.UserId);
					localStorage.setItem('EmailAddress',this.InvitationEntity.EmailAddress);
						 
					this.InvitationEntity = {};
					InvitationForm.form.markAsPristine();
					this.globals.message = 'Invitation code has been entered successfully. You will be redirected to registration process!';
					this.globals.type = 'success';
					this.globals.msgflag = true;
						
						//this.router.navigate(['/register']);
						window.location.href = '/user/edit/'+UserId;
				}
				
			}, 
			(error) => 
			{
				//alert('error');
				this.btn_disable = false;
				this.submitted = false;
		//		this.globals.isLoading = false;
			//	this.router.navigate(['/pagenotfound']);
			});
		} 		
	}

}

