import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OpenregisterService } from '../services/openregister.service';
import { JwtHelper } from 'angular2-jwt';

declare var $;


@Component({
  selector: 'app-openregister',
  providers: [OpenregisterService],
  templateUrl: './openregister.component.html',
  styleUrls: ['./openregister.component.css']
})
export class OpenregisterComponent implements OnInit {
  departmentList;
	roleList;
  companyList;
  stateList;
  userEntity;
  submitted;
	btn_disable;
	header;
	same;
  constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private OpenregisterService: OpenregisterService) { }


  ngOnInit() {

		this.userEntity={};
		
    this.OpenregisterService.getAllDefaultData()
					.then((data) => {
					//	this.CountryList = data['country'];
						this.roleList = data['role'];
						this.companyList = data['company'];
				//		this.stateList = data['state'];
						this.departmentList = data['department'];
					},
					(error) => {
						//alert('error');
						
					});

					let id = this.route.snapshot.paramMap.get('id');

					this.header = 'Free';
					this.userEntity = {};
					this.userEntity.UserId = 0;
					this.userEntity.RoleId ='';
					this.userEntity.CompanyId ='';
					this.userEntity.DepartmentId = '';
					

  }


  addUser(userForm) {
		debugger
			
			let id = this.route.snapshot.paramMap.get('id');
			this.submitted = true;
			if (userForm.valid) {
				this.submitted = false;
				//this.btn_disable = true;
				this.OpenregisterService.add(this.userEntity)
					.then((data) => {


						if(data=='Fail'){
							this.globals.message = 'Your email address already Registered!';
							this.globals.type = 'danger';
							this.globals.msgflag = true;
							this.router.navigate(['home']);
						} else {
						//alert('success');
						this.btn_disable = false;
						this.submitted = false;
						this.userEntity = {};
						userForm.form.markAsPristine();	
						this.globals.message = 'User Invited Successfully!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
						this.router.navigate(['home']);
						}
					
					},
					(error) => {
						//alert('error');
						this.btn_disable = false;
						this.submitted = false;
										
						//this.router.navigate(['/admin/pagenotfound']);
					});
			}
		}


  checkpassword(){ 
    if(this.userEntity.cPassword != this.userEntity.Password){
      this.same = true;
    } else {
      this.same = false;
    }
    
  }

}
