import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class UserrequestinviteService {

  constructor(private HttpClient: HttpClient,private http: Http, private globals: Globals, private router: Router) { }

  //add users
  add(userEntity){ 
    debugger
    let promise = new Promise((resolve, reject) => { 
      this.http.post(this.globals.baseAPIUrl + 'UserInvitation/addUser', userEntity)
      
        .toPromise()
        .then(
          res => { // Success
            resolve(res.json()); 
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
      this.HttpClient.get(this.globals.baseAPIUrl + '/UserInvitation/getAllUserList')
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
      this.HttpClient.post(this.globals.baseAPIUrl + 'UserInvitation/deleteUser',del)
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
        this.HttpClient.get(this.globals.baseAPIUrl + 'UserInvitation/getById/' + UserId)
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
      this.HttpClient.get(this.globals.baseAPIUrl + 'UserInvitation/getAllDefaultData')
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
  
