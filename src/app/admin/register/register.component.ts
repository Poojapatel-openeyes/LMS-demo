import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	
	CountryList;
	roleList;
	companyList;
	departmentList;
	stateList;
	userEntity;
	submitted;
	btn_disable;
	header;
	msgflag;
	message;
	type;
 
  
	constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private RegisterService: RegisterService) { }

		ngOnInit() {

			this.RegisterService.getAllDefaultData()
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
		if (id) {
	
	
			 this.header = 'Edit';
			this.RegisterService.getById(id)
				.then((data) => {
					this.userEntity = data;
					if (this.userEntity.CountryId > 0) {
						this.RegisterService.getStateList(this.userEntity.CountryId)
							.then((data) => {
								this.stateList = data;
								
							},
							(error) => {
								//alert('error');
								
							});
					}
					
				},
				(error) => {
					//alert('error');
				
				//	this.router.navigate(['/admin/pagenotfound']);
					this.btn_disable = false;
					this.submitted = false;
				});
				}
				else {
					this.header = 'Add';
					this.userEntity = {};
					this.userEntity.UserId = 0;
					this.userEntity.CompanyId = 0;
					this.userEntity.DepartmentId = 0;
					this.userEntity.IsActive = '1';

				}
	
		}
	
	
		addUser(userForm) {
		debugger
			
			let id = this.route.snapshot.paramMap.get('id');
			
			if (userForm.valid) {
				
				//this.btn_disable = true;
				this.RegisterService.add(this.userEntity)
					.then((data) => {

						if (this.userEntity.CountryId > 0) {
							this.RegisterService.getStateList(this.userEntity.CountryId)
								.then((data) => {
									this.stateList = data;
									
								},
								(error) => {
									//alert('error');
									
								});
						}
						alert('success');
						this.btn_disable = false;
						this.submitted = false;
						this.userEntity = {};
						userForm.form.markAsPristine();
						if (id) {
							this.globals.message = 'User Updated Successfully';
							this.globals.type = 'success';
							this.globals.msgflag = true;
						} else {
							this.globals.message = 'User Added Successfully';
							this.globals.type = 'success';
							this.globals.msgflag = true;
						}						
							this.router.navigate(['/admin/register/list']);
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
				this.RegisterService.getStateList(this.userEntity.CountryId)
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
	
	}
	

