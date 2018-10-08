import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { JwtHelper } from 'angular2-jwt';

declare var $,swal: any;

@Component({
	selector: 'app-user',
	providers: [UserService],
	templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
	CountryList;
	departmentList;
	roleList;
	companyList;
	stateList;
	userEntity;
	submitted;
	btn_disable;
	header;
	same;
	primary;
	second1;
	first1;
	// type;
	// message;
	// msgflag;
	constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private UserService: UserService) { }


		ngOnInit() {
			//this.globals = this.global;
		
		this.first1=true;
			  this.userEntity={};
			  
			let id = this.route.snapshot.paramMap.get('id');
			id=new JwtHelper().decodeToken(id);
			//this.UserService.getResetlink(id)
			this.UserService.getResetlink2(id)
			.then((data) => 
			{ 
				if(data=='fail'){
		
					// this.globals.message = 'You are already used this link';
					// this.globals.type = 'danger';
					// this.globals.msgflag = true;
					swal({
						position: 'top-end',
						type: 'danger',
						title: 'You are already used this link',
						showConfirmButton: false,
						timer: 1500
					})
					this.router.navigate(['login']);
				} 	
				else
				{
					this.userEntity={};
					this.UserService.getAllDefaultData()
					.then((data) => {
						this.CountryList = data['country'];
						this.roleList = data['role'];
						this.companyList = data['company'];
						this.stateList = data['state'];
						this.departmentList = data['department'];
					},
					(error) => {
						//alert('error');
						
					});

					let id = this.route.snapshot.paramMap.get('id');
		
					var id1=new JwtHelper().decodeToken(id);
				
					this.userEntity.UserId = id1.UserId;
					if (id) {
					//	alert(this.userEntity.UserId);
					//	var userid = id['UserId'];
					//	alert(this.userEntity.UserId);
								this.header = 'User'; 
								debugger
								this.UserService.getById(this.userEntity.UserId)
								.then((data) => {
									this.userEntity = data;
								
										
									},
									(error) => {
										//alert('error');
									
									//	this.router.navigate(['/admin/pagenotfound']);
										this.btn_disable = false;
										this.submitted = false;
									});
							}
							else
							{
								this.header = 'Add';
								this.userEntity = {};
								this.userEntity.UserId = 0;
								this.userEntity.CompanyId = 0;
								this.userEntity.DepartmentId = 0;
								this.userEntity.IsActive = '1';
			
							}
				
		


				}
		
				
				
			}, 
			(error) => 
					{
						//alert('error');
						this.btn_disable = false;
						this.submitted = false;
					
						//this.router.navigate(['/pagenotfound']);
					});	
				
		  }
		  
		  
		addUser(userForm) {
		debugger
			
			let id = this.route.snapshot.paramMap.get('id');
			this.submitted = true;
			if (userForm.valid) {
				this.submitted = false;
				//this.btn_disable = true;
				this.UserService.add(this.userEntity)
					.then((data) => {

						if (this.userEntity.CountryId > 0) {
							this.UserService.getStateList(this.userEntity.CountryId)
								.then((data) => {
									this.stateList = data;
									
								},
								(error) => {
									//alert('error');
									
								});
						}
						//alert('success');
						this.btn_disable = false;
						this.submitted = false;
						this.userEntity = {};
						userForm.form.markAsPristine();
						// this.globals.message = 'You are registered successfully!';
						// this.globals.type = 'success';
						 // this.globals.msgflag = true;
						 swal({
							position: 'top-end',
							type: 'success',
							title: 'You are registered successfully!',
							showConfirmButton: false,
							timer: 1500
						})
	
						this.router.navigate(['dashboard']);
						// this.router.navigate(['/userprofile/edit/'+this.globals.authData.UserId]);
					},
					(error) => {
						//alert('error');
						this.btn_disable = false;
						this.submitted = false;
						
						//this.router.navigate(['/admin/pagenotfound']);
					});
			}
		}
	
		clearForm(userForm) {
			this.userEntity = {};
			this.userEntity.UserId = 0;
			this.userEntity.CompanyId = 0;
			this.userEntity.DepartmentId = 0;
			this.userEntity.IsActive = '1';
			this.submitted = false;
			userForm.form.markAsPristine();
		}

		getStateList(userForm) {
			userForm.form.controls.StateId.markAsDirty();
			this.userEntity.StateId='';
			if (this.userEntity.CountryId > 0) {
				this.UserService.getStateList(this.userEntity.CountryId)
					.then((data) => {
						this.stateList = data;
					},
					(error) => {
						//alert('error');
					});
			} else {
				this.stateList = [];
			}
		}

		checkpassword(){ 
			if(this.userEntity.cPassword != this.userEntity.Password){
				this.same = true;
			} else {
				this.same = false;
			}
			
		}

		first()
		{
			this.primary=true;
			this.submitted = false;
			this.btn_disable = false;
			this.second1=false;
			this.first1=false;	
	
		}
		pre(){
			this.primary=false;
			this.first1=true;
			this.second1=false;
		}

		Third()
		{
			this.second1=true;
			this.submitted = false;
			this.btn_disable = false;
			this.primary=false;
			this.first1=false;
		}
		pre1(){
			this.primary=true;
			this.second1=false;
			this.first1=false;
		}

	}
	

