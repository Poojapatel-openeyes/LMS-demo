import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IndustryService } from '../services/industry.service';

import { Globals } from '.././globals';

declare var $;

@Component({
  selector: 'app-industrylist',
  providers: [ IndustryService],
  templateUrl: './industrylist.component.html'

})
export class IndustrylistComponent implements OnInit {

	IndustryList;
	deleteEntity;
	msgflag;
	message;
	type;

	//globals;
 constructor( private http: Http, public globals: Globals, private router: Router, private IndustryService: IndustryService, private route:ActivatedRoute) { }

  ngOnInit() { 
	debugger
	this.IndustryService.getAllInd()
		.then((data) => 
		{ 
			this.IndustryList = data;	
			setTimeout(function(){
			var table = $('#dataTables-example').DataTable( {
					"oLanguage": {
						"sLengthMenu": "_MENU_ Industries per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ Industries",
						"sInfoFiltered": "(filtered from _MAX_ total Industries)"
					},
					
				});
			
				
			
			},500); 
		
		}, 
		(error) => 
		{
			//alert('error');
		
			this.router.navigate(['/admin/pagenotfound']);
		});	
		//this.msgflag = false;

	
	}
	
	default(){
		
		}

	deleteIndustry(Industry)
	{ 
		this.deleteEntity =  Industry;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Industry)
	{ 
		var del={'Userid':this.globals,'id':Industry.IndustryId};
		this.IndustryService.delete(del)
		.then((data) => 
		{
			let index = this.IndustryList.indexOf(Industry);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.IndustryList.splice(index, 1);
				//this.router.navigate(['/admin/industry/list']);			 
			}			
			this.globals.message = 'Industry Deleted successfully!';
			this.globals.type = 'success';
			this.globals.msgflag = true;	
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
