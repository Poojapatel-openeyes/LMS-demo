import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class SettingService {

  constructor(private http: HttpClient,private globals: Globals, private router: Router) { }



  add(SettingEntity){ 
    debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Setting/add', SettingEntity)
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
         
        },
        msg => { // Error
      reject(msg);
      
      //this.globals.isLoading = false;
     // this.router.navigate(['/pagenotfound']);
        }
      );
	});		
	return promise;
  }
  

delete(del)
  {
	let promise = new Promise((resolve, reject) => {		
    this.http.post(this.globals.baseAPIUrl + 'Setting/delete',del)
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
      reject(msg);
     // this.globals.isLoading = false;
      //this.router.navigate(['/pagenotfound']);
        }
      );
	});		
	return promise;
  }
  
  getAllSetting()
  {
    debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Setting/getAll')
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
      reject(msg);
      //this.globals.isLoading = false;
     // this.router.navigate(['/pagenotfound']);
        }
      );
	});		
	return promise;
  }
  
  getById(SettingId)
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Setting/getById/' + SettingId)
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
      reject(msg);
     // this.globals.isLoading = false;
     // this.router.navigate(['/pagenotfound']);
        }
      );
	});		
	return promise;
  }  
    
 }


