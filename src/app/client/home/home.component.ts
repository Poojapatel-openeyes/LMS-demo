import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  SettingList;
  constructor(private http: Http, public globals: Globals, private router: Router, private HomeService: HomeService,
		private route: ActivatedRoute) { }


    ngOnInit() { 
      debugger
      this.HomeService.getAllSetting()
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
