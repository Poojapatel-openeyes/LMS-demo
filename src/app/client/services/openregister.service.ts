import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class OpenregisterService {

  constructor(private HttpClient: HttpClient, private http : Http, private globals: Globals, private router: Router) { }

 //add users
  add(userEntity){ 
    debugger
    let promise = new Promise((resolve, reject) => { 
      this.http.post(this.globals.baseAPIUrl + 'OpenRegister/addUser', userEntity)
      
        .toPromise()
        .then( 
          res => { // Success 
        let result = res.json();
        if(result && result.token){
          localStorage.setItem('token',result.token);				
          this.globals.authData = new JwtHelper().decodeToken(result.token);
        }
        resolve(res.json());
          },
          msg => { // Error
        reject(msg.json());
      
    
          }
        );
    });		
    return promise;
    }


     //list all users
     getAllUser(){
	  debugger
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + '/Register/getAllUserList')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
        reject(msg);
       // this.router.navigate(['/pagenotfound']);
          }
        );
    });		
    return promise;
    }


    //delete User
  deleteUser(del){  
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Register/deleteUser',del)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
        reject(msg);
        //this.router.navigate(['/pagenotfound']);
          }
        );
    });		
    return promise;
    }


    getById(UserId){
      debugger
    
      let promise = new Promise((resolve, reject) => {
        this.http.get(this.globals.baseAPIUrl + 'Register/getById/' + UserId)
          .toPromise()
          .then(
            res => { // Success
              resolve(res);
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


       //list all users
  getAllDefaultData(){
	  
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'OpenRegister/getAllDefaultData')
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
        this.http.get(this.globals.baseAPIUrl + 'User/getStateList/' + CountryId)
          .toPromise()
          .then(
            res => { // Success
              resolve(res);
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
