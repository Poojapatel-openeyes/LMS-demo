import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';

import { Globals } from '../globals';

declare var $;


@Component({
  selector: 'app-companylist',
  providers: [ CompanyService],
  templateUrl: './companylist.component.html'

})
export class CompanylistComponent implements OnInit {

	companyList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	//globals;
	 constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
		private CompanyService: CompanyService, public globals: Globals) { }

		ngOnInit() {
		
			
			this.CompanyService.getAllCompany()
			.then((data) => 
			{ 
				this.companyList = data;	
				setTimeout(function(){			
				var table = $('#dataTables-example').DataTable( {
				"oLanguage": {
				  "sLengthMenu": "_MENU_ Companies per Page",
							"sInfo": "Showing _START_ to _END_ of _TOTAL_ Companies",
							"sInfoFiltered": "(filtered from _MAX_ total Companies)",
							retrieve: false
							
				},
				
			  });
			 
			},100); 
			//this.globals.isLoading = false;
			}, 
			(error) => 
			{
				//alert('error');
				//this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});	
			this.msgflag = false;
			//this.globals.isLoading = false;
						
			}
	
	

	deleteCompany(company)
	{ 
		this.deleteEntity =  company;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(company)
	{ 	
		var del={'Userid':this.globals,'id':company.CompanyId};
		this.CompanyService.deleteCompany(del)
		.then((data) => 
		{
			let index = this.companyList.indexOf(company);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.companyList.splice(index, 1);
				this.globals.message = 'Company Deleted Successfully';
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
