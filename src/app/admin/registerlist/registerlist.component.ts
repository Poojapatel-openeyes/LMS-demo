import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '.././globals';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RegisterService } from '../services/register.service';
declare var $;


@Component({
  selector: 'app-registerlist',
  providers: [RegisterService],
  templateUrl: './registerlist.component.html',
  styleUrls: ['./registerlist.component.css']
})
export class RegisterlistComponent implements OnInit {
  userList;
  msgflag;
	message;
	type;
  deleteEntity;
  
  constructor( private http: Http,public globals: Globals, private router: Router, private RegisterService: RegisterService,private route:ActivatedRoute) { }
  ngOnInit()
   {
        this.RegisterService.getAllUser()
        //.map(res => res.json())
        .then((data) => 
        {
          
          this.userList = data;
          setTimeout(function(){
          var table = $('#dataTables-example').DataTable( {
              "oLanguage": {
                "sLengthMenu": "_MENU_ Users per Page",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Users",
                "sInfoFiltered": "(filtered from _MAX_ total Users)"
                            },
                      });
                          $(".user").addClass("selected");
              },500); 
        }, 
        (error) => 
        {
        
        });	
        this.msgflag = false;
            
   }

  
            deleteUser(user)
            { 
              this.deleteEntity =  user;
              $('#Delete_Modal').modal('show');					
            }


            
            deleteConfirm(user)
            { 	
              var del={'Userid':this.globals,'id':user.UserId};
              this.RegisterService.deleteUser(del)
              .then((data) => 
              {
                let index = this.userList.indexOf(user);
                $('#Delete_Modal').modal('hide');
                if (index != -1) {
                  this.userList.splice(index, 1);
                  
                }			
               // alert(data);
                this.globals.message = 'User Deleted Successfully';
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
