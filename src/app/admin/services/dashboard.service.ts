import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient,private globals: Globals, private router: Router) { }


  //  list of setting
  getAllSetting()
  {
    debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Dashboard/getAll')
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

}
