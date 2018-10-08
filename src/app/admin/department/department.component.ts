import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { DepartmentService } from '../services/department.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $,swal: any;
@Component({
  selector: 'app-department',
  providers: [DepartmentService],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentEntity;
	submitted;
	btn_disable;
	header;

  constructor( private http: Http,public globals: Globals, private router: Router, private route:ActivatedRoute, private DepartmentService:DepartmentService ) { }

  ngOnInit() 
  {
	debugger
	 
	  let id = this.route.snapshot.paramMap.get('id');
	 if(id)
	 {	
		 this.header = 'Edit';
		this.DepartmentService.getById(id)
			.then((data) => 
			{
				this.departmentEntity=data;
				
				
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
			 this.departmentEntity = {};
			 this.departmentEntity.DepartmentId = 0;
			  this.departmentEntity.IsActive = '1';
			
	 }
  } 
  
  
  addDepartment(departmentForm)
  {		
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.departmentEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.departmentEntity.CreatedBy = this.globals.authData.UserId;
			this.departmentEntity.UpdatedBy = this.globals.authData.UserId;
			this.departmentEntity.DepartmentId = 0;
			this.submitted = true;
		}
		if(departmentForm.valid){
			this.btn_disable = true;
			this.DepartmentService.add(this.departmentEntity)
			.then((data) => 
			{
				//alert('success');
				//this.aa=true;
				this.btn_disable = false;
				this.submitted = false;
				this.departmentEntity = {};
				departmentForm.form.markAsPristine();
				if (id) {
					// this.globals.message = 'Department Updated Successfully';
					// this.globals.type = 'success';
					// this.globals.msgflag = true;
					swal({
						position: 'top-end',
						type: 'success',
						title: 'Department Updated Successfully',
						showConfirmButton: false,
						timer: 1500
					}) 
				} else {
					// this.globals.message = 'Department Added Successfully';
					// this.globals.type = 'success';
					// this.globals.msgflag = true;
					swal({
						position: 'top-end',
						type: 'success',
						title: 'Department Added Successfully',
						showConfirmButton: false,
						timer: 1500
					}) 
				}
				this.router.navigate(['/admin/department/list']);
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

  clearForm(departmentForm)
	{
		this.departmentEntity = {};	
		this.departmentEntity.DepartmentId = 0;
    this.departmentEntity.IsActive = '1';	
		this.submitted = false;
		departmentForm.form.markAsPristine();
	}	

}
