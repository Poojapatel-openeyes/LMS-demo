import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { IndustryService } from '../services/industry.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
@Component({
	selector: 'app-industry',
	providers: [IndustryService],
	templateUrl: './industry.component.html'

})
export class IndustryComponent implements OnInit {

	IndustryEntity;
	submitted;
	btn_disable;
	header;
	msgflag;
	message;
	type;
	constructor(private http: Http, public globals: Globals, private router: Router, private IndustryService: IndustryService,
		private route: ActivatedRoute) { }


		ngOnInit() 
		{
		  
		   
			let id = this.route.snapshot.paramMap.get('id');
		   if(id)
		   {	
			   this.header = 'Edit';
			  this.IndustryService.getById(id)
				  .then((data) => 
				  {
					  this.IndustryEntity=data;
					  
					  
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
				   this.IndustryEntity = {};
				   this.IndustryEntity.IndustryId = 0;
					this.IndustryEntity.IsActive = '1';
				  
		   }
		}


	addIndustry(IndustryForm) 
	{		
		  let id = this.route.snapshot.paramMap.get('id');
		  if(id){
			  this.submitted = false;
		  } else {
			  this.IndustryEntity.IndustryId = 0;
			  this.submitted = true;
		  }
		  if(IndustryForm.valid){
			  this.btn_disable = true;
			  this.IndustryService.add(this.IndustryEntity)
			  .then((data) => 
			  {
				 // alert('success');
				  //this.aa=true;
				  this.btn_disable = false;
				  this.submitted = false;
				  this.IndustryEntity = {};
				  IndustryForm.form.markAsPristine();
				  if (id) {
					this.globals.message = 'Industry Updated Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Industry Added Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} 
				  this.router.navigate(['/admin/industry/list']);
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
  
	clearForm(IndustryForm)
	  {
		  this.IndustryEntity = {};	
		  this.IndustryEntity.IndustryId = 0;
	 	  this.IndustryEntity.IsActive = '1';	
		  this.submitted = false;
		  IndustryForm.form.markAsPristine();
	  }	
  
}
