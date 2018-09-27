import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { UserrequestService } from '../services/userrequest.service';

@Component({
  selector: 'app-userrequest',
  providers: [UserrequestService],
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {

	companyList;
	departmentList;

	userEntity;
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
		private UserrequestService: UserrequestService) { }

		ngOnInit() {

			
			this.userEntity = {};
			this.UserrequestService.getAllDefaultData()
			.then((data) => {
			//	this.CountryList = data['country'];
			//	this.roleList = data['role'];
				this.companyList = data['company'];
			//	this.stateList = data['state'];
				this.departmentList = data['department'];
				this.IndustryList = data['industry'];
				this.parentCompanyList=data['parentcomp']; 
			},
			(error) => {
				//alert('error');
				
			});
	
			let id = this.route.snapshot.paramMap.get('id');
			// if (id) {
		
		
			// 	 this.header = 'Edit';
			// 	this.UserrequestService.getById(id)
			// 		.then((data) => {
			// 			this.userEntity = data;
						
			// 		},
			// 		(error) => {
			// 			//alert('error');
					
			// 		//	this.router.navigate(['/admin/pagenotfound']);
			// 			this.btn_disable = false;
			// 			this.submitted = false;
			// 		});
			// 		}
			// 		else {
						this.header = 'Request to';
						this.userEntity = {};
						this.userEntity.UserId = 0;
						this.userEntity.CompanyId ='';
						this.userEntity.DepartmentId = '';
						this.userEntity.IndustryId ='';
						this.userEntity.ParentId ='';
						this.userEntity.IsActive = '1';
	
					
		
	
		}
	
	
		addUser(userForm) {
		debugger
			
			let id = this.route.snapshot.paramMap.get('id');
			this.submitted = true;
			if (userForm.valid) {
				if(this.companyhide==true){
					this.userEntity.CompanyId = 0;
				} 
				this.submitted = true;
				//this.btn_disable = true;
				this.UserrequestService.add(this.userEntity)
					.then((data) => {
						if(data=='Fail'){
							this.globals.message = 'Your email address already Registered!';
							this.globals.type = 'danger';
							this.globals.msgflag = true;
							//this.router.navigate(['login']);
						} else {
					//	alert('success');
						this.btn_disable = false;
						this.submitted = false;
						this.userEntity = {};
						userForm.form.markAsPristine();	
						this.globals.message = 'Your request send Successfully!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
						this.router.navigate(['home']);
						}
					},
					(error) => {
						alert('error');
						this.btn_disable = false;
						this.submitted = false;
					
						//this.router.navigate(['/admin/pagenotfound']);
					});
			}
		}
	
		// clearForm(userForm) {
		// 	this.userEntity = {};
		// 	this.userEntity.UserId = 0;
		// 	this.userEntity.CompanyId = 0;
		// 	this.userEntity.DepartmentId = 0;
		// 	this.userEntity.IsActive = '1';
		// 	this.submitted = false;
		// 	userForm.form.markAsPristine();
		// }

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
	

