import { Component, OnInit, ElementRef  } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { AuditlogService } from '../services/auditlog.service';
declare var $,unescape: any;

@Component({
  selector: 'app-loginlog',
  providers: [ AuditlogService ],
  templateUrl: './loginlog.component.html',
  styleUrls: ['./loginlog.component.css']
})
export class LoginlogComponent implements OnInit {
  loginlogList;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute,
    private AuditlogService: AuditlogService, public globals: Globals)  {  }
 

    ngOnInit() { 
    
      this.AuditlogService.getLoginLog()
      .then((data) => 
      { 
        this.loginlogList = data;	
        setTimeout(function(){
        var table = $('#dataTables-example').DataTable( {
          "oLanguage": {
          "sLengthMenu": "_MENU_ Login Log per Page",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Login Log",
                "sInfoFiltered": "(filtered from _MAX_ total Log)",
                "sInfoEmpty": "Showing 0 to 0 of 0 Login Log"
          },
     
        });
    
        
        },100); 	
      //  this.globals.isLoading = false;
      }, 
      (error) => 
      {
       // alert('error');
       // this.globals.isLoading = false;
      });  


    }
  



}
