import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
declare var $,PerfectScrollbar: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public globals: Globals, private router: Router) { }


  ngOnInit() {
  }

  addclass(i){
    if(!$("#sel"+i).hasClass("inner_dropdown")){
      $(".test").removeClass("selected");
      $("#sel"+i).addClass("selected");
    }    
      $(".nav-second-level").addClass("display_block");
      var check = $("#nav"+i).parent().hasClass("active");
      $(".nav-second-level").parent().removeClass("active");
      if(check){
        $("#nav"+i).parent().removeClass("active");
      } else {
        $("#nav"+i).parent().addClass("active");
        $("#nav"+i).removeClass("display_block");	
    }   
  }

  addsubclass(i,j){ 
    $(".nav-second-level").addClass("display_block");
    $("#nav"+i).parent().removeClass("active");
    $("#nav"+i).removeClass("display_block");	
    $(".test").removeClass("selected");
    $("#slc"+i+j).addClass("selected");
  }

  dash(){
    $(".nav-second-level").parent().removeClass("active");
    $(".nav-second-level").addClass("display_block");
    $(".test").removeClass("selected");
    $("#dash").addClass("selected");
  }

  menuopen(path){
    this.globals.msgflag = false;	  
    this.globals.currentLink = this.router.url;
    this.router.navigate([path]);
  }

}
