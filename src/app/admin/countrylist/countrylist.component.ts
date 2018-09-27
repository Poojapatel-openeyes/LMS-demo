import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { Globals } from '.././globals';

declare var $,unescape: any;
@Component({
  selector: 'app-countrylist',
    providers: [ CountryService],
  templateUrl: './countrylist.component.html'
})
export class CountrylistComponent implements OnInit {

    CountryList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	//globals;
 constructor( private http: Http,public globals: Globals, private router: Router, 
	private CountryService: CountryService, private route:ActivatedRoute) { }


  ngOnInit() { 
	
	{
		this.CountryService.getAllCou()
	.then((data) => 
	{ 
		this.CountryList = data;	
		setTimeout(function(){
		var table = $('#dataTables-example').DataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Country per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Country",
					"sInfoFiltered": "(filtered from _MAX_ total Country)"
        },
	
	  });
	
				
					
    },500); 

	}, 
	(error) => 
	{
		//alert('error');
		
		this.router.navigate(['/admin/pagenotfound']);
	});	
	this.msgflag = false;
	
			
	}
	
	
	}

	deleteCountry(Country)
	{ 
		this.deleteEntity =  Country;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Country)
	{ 	
		var del={'Userid':this.globals,'id':Country.CountryId};
		this.CountryService.delete(del)
		.then((data) => 
		{
			let index = this.CountryList.indexOf(Country);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.CountryList.splice(index, 1); 
				this.globals.message = 'Country Deleted Successfully';
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
