import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { Globals } from '../globals';
declare var $,swal: any;



@Component({
	selector: 'app-state',
	providers: [StateService],
	templateUrl: './state.component.html'
})
export class StateComponent implements OnInit {
	CountryEntity;
	CountryList;
	stateEntity;
	header;
	btn_disable;
	submitted;
	msgflag;
	message;
	type;

	constructor(private http: Http, private router: Router, private route: ActivatedRoute,
		private StateService: StateService, public globals: Globals) { }

	ngOnInit() {
	
		this.StateService.getAllCountry()
		.then((data) => {
			this.CountryList = data;
			
		},
		(error) => {
			//alert('error');
		});

	let id = this.route.snapshot.paramMap.get('id');
	if (id) {


		 this.header = 'Edit';
		this.StateService.getById(id)
			.then((data) => {
				this.stateEntity = data;
			
				
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
				this.stateEntity = {};
				this.stateEntity.StateId = 0;
				this.stateEntity.IsActive = '1';
				this.stateEntity.CountryId='';
			}

	}


	addState(stateForm) {
	debugger
		
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.stateEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.stateEntity.CreatedBy = this.globals.authData.UserId;
			this.stateEntity.UpdatedBy = this.globals.authData.UserId;
			this.stateEntity.CountryId = 0;
			this.submitted = true;
		}
		if (stateForm.valid) {
			
			//this.btn_disable = true;
			this.StateService.add(this.stateEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.stateEntity = {};
					stateForm.form.markAsPristine();
					if (id) {
							// this.globals.message = 'State Updated Successfully';
							// this.globals.type = 'success';
							// this.globals.msgflag = true;
							swal({
								position: 'top-end',
								type: 'success',
								title: 'State Updated Successfully!',
								showConfirmButton: false,
								timer: 1500
							})
						} else {
							// this.globals.message = 'State Added Successfully';
							// this.globals.type = 'success';
							// this.globals.msgflag = true;
							swal({
								position: 'top-end',
								type: 'success',
								title: 'State Added Successfully!',
								showConfirmButton: false,
								timer: 1500
							})
						}
					this.router.navigate(['/admin/state/list']);
				},
				(error) => {
					//alert('error');
					this.btn_disable = false;
					this.submitted = false;
					
					//this.router.navigate(['/admin/pagenotfound']);
				});
		}
	}

	clearForm(stateForm) {
		this.stateEntity = {};
		this.stateEntity.StateId = 0;
		this.stateEntity.IsActive = '1';
		this.submitted = false;
		stateForm.form.markAsPristine();
	}

}
