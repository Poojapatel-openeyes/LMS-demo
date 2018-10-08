import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { UserinviteService } from '../services/userinvite.service';

declare var $,swal: any;
@Component({
  selector: 'app-userinvite',
  providers: [UserinviteService],
  templateUrl: './userinvite.component.html',
  styleUrls: ['./userinvite.component.css']
})
export class UserinviteComponent implements OnInit {
	inviteUserEntity;
	roleList;
	departmentList;
	companyList;
 	submitted;
	btn_disable;
	header;
	companyhide;
	ComL;
	isDisabled;
	submitted1;
	IndustryList;
	parentCompanyList;
	
  constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private UserinviteService: UserinviteService) { }

  ngOnInit() {

	this.inviteUserEntity = {};
	this.inviteUserEntity.UserId = 0;
	this.inviteUserEntity.RoleId ='';
	this.inviteUserEntity.DepartmentId ='';
	this.inviteUserEntity.CompanyId ='';
	this.inviteUserEntity.IndustryId ='';
	this.inviteUserEntity.ParentId ='';
	//this.inviteUserEntity.IsActive = '1';

    	// this.UserinviteService.getAllCountry()
			// .then((data) => {
			// 	this.CountryList = data;
				
			// },
			// (error) => {
			// 	//alert('error');
	  // });
	  
	  this.UserinviteService.getAllDefaultData()
	  .then((data) => {
		  this.IndustryList = data['industry'];
		  this.roleList = data['role'];
		  this.companyList = data['company'];
	//	  this.stateList = data['state'];
		  this.departmentList = data['department'];
		  this.parentCompanyList=data['parentcomp']; 
	  },
	  (error) => {
		  //alert('error');
		  
	  });

	  let id = this.route.snapshot.paramMap.get('id');
		if (id) {
		}

      
  }



  inviteUser(inviteForm) {
		debugger
			
			let id = this.route.snapshot.paramMap.get('id');
			this.submitted = true;
			if (inviteForm.valid) {
				this.submitted = false;
				if(this.companyhide==true){
					this.inviteUserEntity.CompanyId = 0;
				} 
				//this.btn_disable = true;
				this.UserinviteService.add(this.inviteUserEntity)
					.then((data) => {

						if(data=='Fail'){
							// this.globals.message = 'Your email address already Registered!';
							// this.globals.type = 'danger';
							// this.globals.msgflag = true;
							swal({
								position: 'top-end',
								type: 'danger',
								title: 'Your email address already Registered!',
								showConfirmButton: false,
								timer: 1500
							})
							this.router.navigate(['/admin/userinvite/list']);
						} else {
						//alert('success');
						this.btn_disable = false;
						this.submitted = false;
						this.inviteUserEntity = {};
						inviteForm.form.markAsPristine();	
						// this.globals.message = 'User Invited Successfully!';
						// this.globals.type = 'success';
						// this.globals.msgflag = true;

						swal({
							position: 'top-end',
							type: 'success',
							title: 'User Invited Successfully!',
							showConfirmButton: false,
							timer: 1500
						})
						this.router.navigate(['/admin/userinvite/list']);
						}
					//	alert('success');
						// this.btn_disable = false;
						// this.submitted = false;
						// this.inviteUserEntity = {};
						// inviteForm.form.markAsPristine();
						// if (id) {
						// 	this.globals.message = 'User Invited Successfully';
						// 	this.globals.type = 'success';
						// 	this.globals.msgflag = true;
						// } else if(data=='Fail') {
						// 	this.globals.message = 'User Invited Successfully';
						// 	this.globals.type = 'success';
						// 	this.globals.msgflag = true;
						// }
						// this.router.navigate(['/admin/userinvite/list']);
					},
					(error) => {
						alert('error');
						this.btn_disable = false;
						this.submitted = false;
						this.inviteUserEntity = {};
						inviteForm.form.markAsPristine();
						
						//this.router.navigate(['/admin/pagenotfound']);
					});
			}
		}


		com()
	{
		this.companyhide=true;
		this.submitted1 = false;
		this.btn_disable = false;
	//	var email = this.UserinviteService.EmailAddress;
	//	var RoleId = this.UserinviteService.RoleId;
		// this.UserinviteService={};
		// this.UserinviteService.CompanyId ='';
		// this.UserinviteService.RoleId =RoleId;
		// this.UserinviteService.IndustryId ='';
		// this.UserinviteService.UserId ='';
	//	this.UserinviteService.EmailAddress = email;
		this.isDisabled=true;
		

	}
	del(){
		this.companyhide=false;
	}

}
