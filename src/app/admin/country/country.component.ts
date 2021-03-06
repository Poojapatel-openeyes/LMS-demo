import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { CountryService } from '../services/country.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var $,swal: any;

@Component({
	selector: 'app-country',
	providers: [CountryService],
	templateUrl: './country.component.html'

})
export class CountryComponent implements OnInit {
	CountryEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, public globals: Globals, private router: Router,
		private CountryService: CountryService, private route: ActivatedRoute) { }



		ngOnInit() 
		{
		  
		   
			let id = this.route.snapshot.paramMap.get('id');
		   if(id)
		   {	
			   this.header = 'Edit';
			  this.CountryService.getById(id)
				  .then((data) => 
				  {
					  this.CountryEntity=data;
					  
					  
				  }, 
				  (error) => 
				  {
					  //alert('error');
					  this.btn_disable = false;
					  this.submitted = false;
				  
				  //	this.router.navigate(['/admin/pagenotfound']);
				  });
		   }
		   else
		   {
				   this.CountryEntity = {};
				   this.CountryEntity.CountryId = 0;
					this.CountryEntity.IsActive = '1';
				  
		   }
		}


	addCountry(CountryForm) 
	{		
		  let id = this.route.snapshot.paramMap.get('id');
		  if (id) {
			this.CountryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.CountryEntity.CreatedBy = this.globals.authData.UserId;
			this.CountryEntity.UpdatedBy = this.globals.authData.UserId;
			this.CountryEntity.CompanyId = 0;
			this.submitted = true;
		}
		  if(id){
			  this.submitted = false;
		  } else {
			  this.CountryEntity.CountryId = 0;
			  this.submitted = true;
		  }
		  if(CountryForm.valid){
			  this.btn_disable = true;
			  this.CountryService.add(this.CountryEntity)
			  .then((data) => 
			  {
				 // alert('success');
				  //this.aa=true;
				  this.btn_disable = false;
				  this.submitted = false;
				  this.CountryEntity = {};
				  CountryForm.form.markAsPristine();
				  if (id) {
					
					swal({
						position: 'top-end',
						type: 'success',
						title: 'Country Updated Successfully',
						showConfirmButton: false,
						timer: 1500
					}) 
				  } else {
					
					swal({
						position: 'top-end',
						type: 'success',
						title: 'Country Added Successfully',
						showConfirmButton: false,
						timer: 1500
					}) 
				  }

				  this.router.navigate(['/admin/country/list']);
			  }, 
			  (error) => 
			  {
				  //alert('error');
				  this.btn_disable = false;
				  this.submitted = false;
			  
			  //	this.router.navigate(['/admin/pagenotfound']);
			  });	
		  
		  }
	  }
  
	clearForm(CountryForm)
	  {
		  this.CountryEntity = {};	
		  this.CountryEntity.CountryId = 0;
	  	  this.CountryEntity.IsActive = '1';	
		  this.submitted = false;
		  CountryForm.form.markAsPristine();
	  }	
  
}
