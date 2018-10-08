import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { AuditlogService } from '../services/auditlog.service';
declare var $,unescape: any;

@Component({
  selector: 'app-emaillog',
  providers: [AuditlogService],
  templateUrl: './emaillog.component.html',
  styleUrls: ['./emaillog.component.css']
})
export class EmaillogComponent implements OnInit {
  emaillogList;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute,
    private AuditlogService: AuditlogService, public globals: Globals)  {  }

 
    ngOnInit() { 
    
      this.AuditlogService.getEmailLog()
      .then((data) => 
      { 
        this.emaillogList = data;	
        setTimeout(function(){
        var table = $('#dataTables-example').DataTable( {
          "oLanguage": {
          "sLengthMenu": "_MENU_ Email Log per Page",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Email Log",
                "sInfoFiltered": "(filtered from _MAX_ total Log)",
                "sInfoEmpty": "Showing 0 to 0 of 0 Email Log"
          },
     
        });
   
      
        },100); 	
        this.globals.isLoading = false;
      }, 
      (error) => 
      {
        //alert('error');
        this.globals.isLoading = false;
        this.router.navigate(['/admin/pagenotfound']);
      }); 
     	
    }
  


}
