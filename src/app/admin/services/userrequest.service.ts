import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class UserrequestService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  //add users
  add(userEntity){ 
    debugger
    let promise = new Promise((resolve, reject) => { 
      this.http.post(this.globals.baseAPIUrl + 'Userrequest/addUser', userEntity)
      
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
  
  
     //list all users
     getAllUser(){
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + '/Userrequest/getAllUserList')
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
      this.http.post(this.globals.baseAPIUrl + 'Userrequest/deleteUser',del)
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
        this.http.get(this.globals.baseAPIUrl + 'Userrequest/getById/' + UserId)
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
      this.http.get(this.globals.baseAPIUrl + 'Userrequest/getAllDefaultData')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
        reject(msg);
        //this.globals.isLoading = false;
        this.router.navigate(['/pagenotfound']);
          }
        );
    });		
    return promise;
    }
  
  
  
  
  
  
  }
  
