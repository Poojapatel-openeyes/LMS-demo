import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { AuditlogService } from '../services/auditlog.service';
declare var $,unescape: any;
@Component({
  selector: 'app-activitylog',
  providers: [AuditlogService],
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.css']
})
export class ActivitylogComponent implements OnInit {
  activitylogList;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute,
    private AuditlogService: AuditlogService, public globals: Globals)  {  }


 
    ngOnInit() { 
    
      this.AuditlogService.getActivityLog()
      .then((data) => 
      { 
        this.activitylogList = data;	
        setTimeout(function(){
        var table = $('#dataTables-example').DataTable( {
          "oLanguage": {
          "sLengthMenu": "_MENU_ Audit Log per Page",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Audit Log",
                "sInfoFiltered": "(filtered from _MAX_ total Log)",
                "sInfoEmpty": "Showing 0 to 0 of 0 Audit Log"
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
