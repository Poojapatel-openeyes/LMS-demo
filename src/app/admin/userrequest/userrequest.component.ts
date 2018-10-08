import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
//import { UserrequestinviteService } from '../services/userrequest.service';
import { UserrequestinviteService } from '../services/userrequestinvite.service';
declare var $,swal: any;
@Component({
  selector: 'app-userrequest',
  providers: [UserrequestinviteService],
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {
	CountryList;
	roleList;
	companyList;
	departmentList;
	stateList;
	userEntity;
	submitted;
	btn_disable;
	header;
//	salesList;
 
  
	constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private UserrequestinviteService: UserrequestinviteService ) { }

		ngOnInit() {



			this.UserrequestinviteService.getAllDefaultData()
			.then((data) => {
				//this.CountryList = data['country'];
				this.roleList = data['role'];
				this.companyList = data['company'];
			//	this.stateList = data['state'];
				this.departmentList = data['department'];
			},
			(error) => {
				//alert('error');
				
			});
	
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
	
	
			 this.header = 'Edit';
			this.UserrequestinviteService.getById(id)
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
				else {
					this.header = 'Add';
					this.userEntity = {};
					this.userEntity.UserId = 0;
					this.userEntity.CompanyId = 0;
					this.userEntity.DepartmentId = 0;
					//this.userEntity.IsActive = '1';

				}
	
		}
	
	
		addUser(userForm) {
		debugger
			
			let id = this.route.snapshot.paramMap.get('id');
		//	this.submitted = true;
			if (userForm.valid) {
				//this.submitted = false;
				//this.btn_disable = true;
				this.UserrequestinviteService.add(this.userEntity)
					.then((data) => {

					//	alert('success');
						this.btn_disable = false;
						this.submitted = false;
						this.userEntity = {};
						userForm.form.markAsPristine();
						if (id) {
							// this.globals.message = 'Data Updated Successfully';
							// this.globals.type = 'success';
							// this.globals.msgflag = true;
							swal({
								position: 'top-end',
								type: 'success',
								title: 'Data Updated Successfully!',
								showConfirmButton: false,
								timer: 1500
							})
						} else {
							
							// this.globals.message = 'Invitation Code Sent Successfully';
							// this.globals.type = 'success';
							// this.globals.msgflag = true;
							swal({
								position: 'top-end',
								type: 'success',
								title: 'Invitation Code Sent Successfully!',
								showConfirmButton: false,
								timer: 1500
							})
						
						}
	
	
						this.router.navigate(['/admin/userrequest/list']);
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
			//this.userEntity.IsActive = '1';
			this.submitted = false;
			userForm.form.markAsPristine();
		}


	
	}
	

