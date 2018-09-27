import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../services/department.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-departmentlist',
  providers: [ DepartmentService ],
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css']
})
export class DepartmentlistComponent implements OnInit {
  departmentList;
  deleteEntity;
	msgflag;
	message;
	type;
	//globals;
   constructor(private http: Http, private router: Router, private route: ActivatedRoute, private DepartmentService: DepartmentService, public globals: Globals) { }

  
  ngOnInit()
  {
		// this.globals.isLoading = true;	
		//this.globals = this.global;
	this.DepartmentService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.departmentList = data;
				setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Department per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Department",
					"sInfoFiltered": "(filtered from _MAX_ total Department)"
        }
      });
		},100); 
	//	this.globals.isLoading = false;	
	}, 
	(error) => 
	{
		//alert('error');
	//	this.globals.isLoading = false;
		this.router.navigate(['/admin/pagenotfound']);	});	
	  this.msgflag = false;
  }
  
  deleteDepartment(Department)
	{ 
		this.deleteEntity =  Department;
		$('#Delete_Modal').modal('show');					
	}
  
  deleteConfirm(Department)
	{ 
		this.DepartmentService.deleteDepartment(Department.DepartmentId)
		.then((data) => 
		{
			let index = this.departmentList.indexOf(Department);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.departmentList.splice(index, 1);
				//this.router.navigate(['/department/list']);
				this.globals.message = 'Department Deleted successfully!';
				this.globals.type = 'success';
				this.globals.msgflag = true;	 
			}			
			//alert(data);
			
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency!";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});	
	}
  

}
