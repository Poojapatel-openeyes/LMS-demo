import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-setting',
  providers: [SettingService],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  SettingEntity;
	submitted;
	btn_disable;
	header;
	msgflag;
	message;
	type;
  constructor(private http: Http, public globals: Globals, private router: Router, private SettingService: SettingService,
		private route: ActivatedRoute) { }

    ngOnInit() 
		{
		  
		   
			let id = this.route.snapshot.paramMap.get('id');
		   if(id)
		   {	
			   this.header = 'Edit';
			  this.SettingService.getById(id)
				  .then((data) => 
				  {
					  this.SettingEntity=data;
					  
					  
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
				   this.SettingEntity = {};
				   this.SettingEntity.SettingId = 0;
					this.SettingEntity.IsActive = '1';
				  
		   }
		}


	addSetting(SettingForm) 
	{		
		  let id = this.route.snapshot.paramMap.get('id');
		  if(id){
			  this.submitted = false;
		  } else {
			  this.SettingEntity.SettingId = 0;
			  this.submitted = true;
		  }
		  if(SettingForm.valid){
			  this.btn_disable = true;
			  this.SettingService.add(this.SettingEntity)
			  .then((data) => 
			  {
				 // alert('success');
				  //this.aa=true;
				  this.btn_disable = false;
				  this.submitted = false;
				  this.SettingEntity = {};
				  SettingForm.form.markAsPristine();
				  if (id) {
					this.globals.message = 'Setting Updated Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Setting Added Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} 
				  this.router.navigate(['/admin/setting/list']);
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
  
	clearForm(SettingForm)
	  {
		  this.SettingEntity = {};	
		  this.SettingEntity.SettingId = 0;
	 	  this.SettingEntity.IsActive = '1';	
		  this.submitted = false;
		  SettingForm.form.markAsPristine();
	  }	
  
}
