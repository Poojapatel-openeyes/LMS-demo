import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '.././globals';
import { forEach } from '@angular/router/src/utils/collection';
import { EmailtemplateService } from '../services/emailtemplate.service';
declare var $,unescape: any,swal: any;

import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-emailtemplate-list',
  providers: [ EmailtemplateService],
  templateUrl: './emailtemplate-list.component.html'

})
export class EmailtemplateListComponent implements OnInit {
	
  	EmailList;
	deleteEntity;
	msgflag;
	message;
	type;

	//globals;

 constructor( private http: HttpClient,public globals: Globals, private router: Router, 
	private EmailtemplateService: EmailtemplateService, private route:ActivatedRoute) { }


ngOnInit() {  
	
	this.EmailtemplateService.getAll()
	.then((data) => 
	{ 
		//alert(data);		
		// for(var i=1; i<=data.length; i++){
		// 	data[i].To=data[i].To.toString().replace("1","Admin");	
		// }		
		this.EmailList = data;
		setTimeout(function(){
			var table = $('#dataTables-example').DataTable( {
				"oLanguage": {
					"sLengthMenu": "_MENU_ Email per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Email",
					"sInfoFiltered": "(filtered from _MAX_ total Email)"
				},
				
			});
				
		},500); 
	//	this.globals.isLoading = false;
	}, 
	(error) => 
	{
		//alert('error');
	//	this.globals.isLoading = false;
		this.router.navigate(['/admin/pagenotfound']);
	});	
	//this.msgflag = false;
			
	}
	
	default(){

	}

	deleteEmail(Email)
	{ 
		this.deleteEntity =  Email;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Email)
	{ 
		var del={'Userid':this.globals.authData.UserId,'id':Email.EmailId};
		this.EmailtemplateService.delete(del)
		.then((data) => 
		{
			let index = this.EmailList.indexOf(Email);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.EmailList.splice(index, 1);
			}	
		// this.globals.message = 'Email Template Deleted Successfully!';
		// 	this.globals.type = 'success';
		// 	this.globals.msgflag = true;
		swal({
			position: 'top-end',
			type: 'success',
			title: 'Email Template Deleted Successfully!',
			showConfirmButton: false,
			timer: 1500
		})
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

