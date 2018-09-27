import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from '../services/setting.service';
declare var $;

@Component({
  selector: 'app-settinglist',
  providers: [SettingService],
  templateUrl: './settinglist.component.html',
  styleUrls: ['./settinglist.component.css']
})
export class SettinglistComponent implements OnInit {
  SettingList;
	deleteEntity;
	msgflag;
	message;
	type;
	
  constructor(private http: Http, public globals: Globals, private router: Router, private SettingService: SettingService,
		private route: ActivatedRoute) { }

  	
 
  ngOnInit() { 
	debugger
	this.SettingService.getAllSetting()
		.then((data) => 
		{ 
			this.SettingList = data;	
			setTimeout(function(){
			var table = $('#dataTables-example').DataTable( {
					"oLanguage": {
						"sLengthMenu": "_MENU_ Settings per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ Settings",
						"sInfoFiltered": "(filtered from _MAX_ total Settings)"
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
	
	

	deleteSetting(Setting)
	{ 
		this.deleteEntity =  Setting;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Setting)
	{ 
		var del={'Userid':this.globals,'id':Setting.SettingId};
		this.SettingService.delete(del)
		.then((data) => 
		{
			let index = this.SettingList.indexOf(Setting);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.SettingList.splice(index, 1);
				
			}	
			this.globals.message = 'Setting Deleted Successfully';
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

