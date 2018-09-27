import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  SettingList;
  constructor(private http: Http, public globals: Globals, private router: Router, private DashboardService: DashboardService,
		private route: ActivatedRoute) { }


    ngOnInit() { 
      debugger
      this.DashboardService.getAllSetting()
        .then((data) => 
        { 
          this.SettingList = data;	
          
        }, 
        (error) => 
        {
          //alert('error');
        
         // this.router.navigate(['/admin/pagenotfound']);
        });	
        //this.msgflag = false;
    
      
      }

}
