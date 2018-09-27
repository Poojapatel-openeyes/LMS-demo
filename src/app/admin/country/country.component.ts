import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { CountryService } from '../services/country.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var $;

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
				  alert('success');
				  //this.aa=true;
				  this.btn_disable = false;
				  this.submitted = false;
				  this.CountryEntity = {};
				  CountryForm.form.markAsPristine();
				  if (id) {
					  this.globals.message = 'Country Updated Successfully';
					  this.globals.type = 'success';
					  this.globals.msgflag = true;
				  } else {
					  this.globals.message = 'Country Added Successfully';
					  this.globals.type = 'success';
					  this.globals.msgflag = true;
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
