import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { debug } from 'util';

declare var $,swal: any;

@Component({
	selector: 'app-company',
	providers: [CompanyService],
	templateUrl: './company.component.html'

})

export class CompanyComponent implements OnInit {
	IndustryList;
	CompanyList;
	companyEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private CompanyService: CompanyService) { }

	ngOnInit() {
		
		//this.companyEntity = {};

		debugger
	this.CompanyService.getAllCo()
	//.map(res => res.json())
	.then((data) => {
		this.CompanyList = data;
	//	console.log(data);
	},
	(error) => {
		//alert('error');
	
		//this.router.navigate(['/admin/pagenotfound']);
	});

		this.CompanyService.getAllIndustry()
		//.map(res => res.json())
		.then((data) => {
			this.IndustryList = data;
		},
		(error) => {
			//alert('error');
		
			this.router.navigate(['/admin/pagenotfound']);
		});

	let id = this.route.snapshot.paramMap.get('id');
	if (id) {
		this.header = 'Edit';
		this.CompanyService.getById(id)
			.then((data) => {
				this.companyEntity = data;
				
			},
			(error) => {
				//alert('error');
				this.btn_disable = false;
				this.submitted = false;
			
				//this.router.navigate(['/admin/pagenotfound']);
			});
	}
	else {
		this.header = 'Add';
		this.companyEntity = {};
		this.companyEntity.CompanyId = 0;
		this.companyEntity.IsActive = '1';
	
	}
	setTimeout(function(){
		$(".company").addClass("selected");
	},500);
		
	}

	addCompany(companyForm) {
		
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.companyEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.companyEntity.CreatedBy = this.globals.authData.UserId;
			this.companyEntity.UpdatedBy = this.globals.authData.UserId;
			this.companyEntity.CompanyId = 0;
			this.submitted = true;
		}
		if (companyForm.valid) {
			this.btn_disable = true;
			this.CompanyService.add(this.companyEntity)
				.then((data) => {
					//alert('success');
					//this.aa=true;
					this.btn_disable = false;
					this.submitted = false;
					this.companyEntity = {};
					companyForm.form.markAsPristine();
					if (id) {

						swal({
							position: 'top-end',
							type: 'success',
							title: 'Company Updated Successfully',
							showConfirmButton: false,
							timer: 1500
						})
						
					} else {
					
						swal({
							position: 'top-end',
							type: 'success',
							title: 'Company Added Successfully',
							showConfirmButton: false,
							timer: 1500
						})
					}

				

					this.router.navigate(['/admin/company/list']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});

		}
	}

	clearForm(companyForm) {
		this.companyEntity = {};
		this.companyEntity.CompanyId = 0;
		this.companyEntity.IsActive = '1';
		this.submitted = false;
		companyForm.form.markAsPristine();
	}

}
