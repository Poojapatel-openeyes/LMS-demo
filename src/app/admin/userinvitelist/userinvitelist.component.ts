import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '.././globals';
declare var $,swal: any;
import { UserinviteService } from '../services/userinvite.service';

@Component({
  selector: 'app-userinvitelist',
  providers: [ UserinviteService ],
  templateUrl: './userinvitelist.component.html',
  styleUrls: ['./userinvitelist.component.css']
})
export class UserinvitelistComponent implements OnInit {
  inviteUserList;
	ReInviteEntity;
	deleteEntity;
  	msgflag;
	message;
	type;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private UserinviteService: UserinviteService, public globals: Globals) { }

  ngOnInit()
  {
		// this.globals.isLoading = true;	
		//this.globals = this.global;
	this.UserinviteService.getAllinviteduser()
	//.map(res => res.json())
	.then((data) => 
	{
		this.inviteUserList = data;
				setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Invited User List per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Invited User List",
					"sInfoFiltered": "(filtered from _MAX_ total Invited User List)"
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
	
	deleteUser(user)
	{ debugger
		this.deleteEntity =  user;
		$('#Delete_Modal').modal('show');					
	}


	deleteConfirm(user)
	{ debugger
		var del={'Userid':this.globals,'id':user.UserId};
		this.UserinviteService.delete(del)
		.then((data) => 
		{
			let index = this.inviteUserList.indexOf(user);
			this.inviteUserList[index].Code ='';
			this.inviteUserList[index].Status =2;
			this.inviteUserList[index].code = '';
			//this.inviteUserList[index].Status =0;
			$('#Delete_Modal').modal('hide');
			
			// this.globals.message = 'Revoked Successfully';
			// this.globals.type = 'success';
			// this.globals.msgflag = true;
			swal({
				position: 'top-end',
				type: 'success',
				title: 'Revoked Successfully!',
				showConfirmButton: false,
				timer: 1500
			})
	
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
			
			}	
		});	
	}

	ReInviteUser(user)
	{ 
		this.ReInviteEntity =  user;
		//this.ReInviteEntity['UpdatedBy'] =  this.globals.authData.UserId;
		$('#ReInvite_Modal').modal('show');					
	}

	ReInviteConfirm(user)
	{ 
debugger
		this.UserinviteService.ReInvite(user)
		.then((data) => 
		{
	
			let index = this.inviteUserList.indexOf(user);
			
			this.inviteUserList[index].Status =0;
			this.inviteUserList[index].Code ='';
			$('#ReInvite_Modal').modal('hide');
			
			// this.globals.message = 'User Re-Invited Successfully';
			// this.globals.type = 'success';
			// this.globals.msgflag = true;
			swal({
				position: 'top-end',
				type: 'success',
				title: 'User Re-Invited Successfully!',
				showConfirmButton: false,
				timer: 1500
			})
		}, 
		(error) => 
		{
		
			$('#ReInvite_Modal').modal('hide');
			if(error.text){
				
			}	
		});	
	}
	
  

}
