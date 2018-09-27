import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
//import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
// import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class UserprofileService {

  constructor(private http: Http, private globals: Globals, private router: Router) { }

//   add(userEntity)
//  {    
// 	let promise = new Promise((resolve, reject) => {
//     this.http.post(this.globals.baseAPIUrl + 'User/addUser', userEntity, this.globals.headerpath)
//       .toPromise()
//       .then( 
//         res => { // Success 
// 			let result = res.json();
// 			if(result && result.token){
// 				localStorage.setItem('token',result.token);				
// 				this.globals.authData = new JwtHelper().decodeToken(result.token);
// 			}
// 		  resolve(res.json());
//         },
//         msg => { // Error
//       reject(msg.json());
     
//      // this.router.navigate(['/pagenotfound']);
//         }
//       );
// 	});		
// 	return promise;
//   }

  add(userEntity){ 
    debugger
    let promise = new Promise((resolve, reject) => { 
      this.http.post(this.globals.baseAPIUrl + 'Userprofile/addUser', userEntity)
      
        .toPromise()
        .then(
          res => { // Success
            resolve(res); 
          },
          msg => { // Error
        reject(msg);
          }
        );
    });		
    return promise;
    }


    getById(UserId){
      debugger
    
      let promise = new Promise((resolve, reject) => {
        this.http.get(this.globals.baseAPIUrl + 'Userprofile/getById/' + UserId,this.globals.headerpath)
          .toPromise()
          .then(
            res => { // Success
              resolve(res.json());
            },
            msg => { // Error
          reject(msg);
       //   this.globals.isLoading = false;
         // this.router.navigate(['/pagenotfound']);
            }
          );
      });		
      return promise;
      }  



  getAllDefaultData(){
	  debugger
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Userprofile/getAllDefaultData',this.globals.headerpath)
        .toPromise()
        .then(
          res => { // Success
            resolve(res.json());
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


    getStateList(CountryId){ 
      let promise = new Promise((resolve, reject) => {
        this.http.get(this.globals.baseAPIUrl + 'Userprofile/getStateList/' + CountryId ,this.globals.headerpath)
          .toPromise()
          .then(
            res => { // Success
              resolve(res.json());
            },
            msg => { // Error
          reject(msg);
          //this.globals.isLoading = false;
          //this.router.navigate(['/pagenotfound']);
            }
          );
      });		
      return promise;
      }  

}
