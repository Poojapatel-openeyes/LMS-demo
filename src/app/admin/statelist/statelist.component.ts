import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { Globals } from '.././globals';
declare var $;

@Component({
  selector: 'app-statelist',
  providers: [ StateService],
  templateUrl: './statelist.component.html'

})
export class StatelistComponent implements OnInit {

	stateList;
	deleteEntity;
	msgflag;
	message;
	type;
	
	 constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
		private StateService: StateService, public globals: Globals) { }

 	ngOnInit()
  	{
		
		this.StateService.getAllState()
		//.map(res => res.json())
		.then((data) => 
		{
			this.stateList = data;
		setTimeout(function(){
		  var table = $('#dataTables-example').DataTable( {
			"oLanguage": {
			  "sLengthMenu": "_MENU_ State per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ State",
						"sInfoFiltered": "(filtered from _MAX_ total State)"
			},
		
				});
		},500); 
		
		}, 
		(error) => 
		{
			//alert('error');
			
		//	this.router.navigate(['/admin/pagenotfound']);	
		});	
		  //this.msgflag = false;
	
	}
	
	

	
  
  deleteState(state)
	{ 
		this.deleteEntity =  state;
		$('#Delete_Modal').modal('show');					
	}
  
  deleteConfirm(state)
	{
		var del={'Userid':this.globals,'id':state.StateId};
		this.StateService.deleteState(del)
		.then((data) => 
		{
			let index = this.stateList.indexOf(state);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.stateList.splice(index, 1);
				 
			}			
			//alert(data);
			this.globals.message = 'State Deleted Successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;

		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
			this.globals.message = "You can't delete this record because of their dependency";
			this.globals.type = 'danger';
			this.globals.msgflag = true;
			}	
		});			
	}


}
