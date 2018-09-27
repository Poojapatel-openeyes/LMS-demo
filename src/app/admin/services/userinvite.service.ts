import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class UserinviteService {

  //constructor(private HttpClient: HttpClient,private http:Http, private globals: Globals, private router: Router) { }
  constructor(private http: HttpClient, private globals: Globals, private router: Router) {  }

  //add users
  add(inviteUserEntity){ 
    debugger
    let promise = new Promise((resolve, reject) => { 
      this.http.post(this.globals.baseAPIUrl + 'Userinvite/addUser', inviteUserEntity)
      
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

    //list all invited users
    getAllinviteduser(){
      debugger
      let promise = new Promise((resolve, reject) => {
        this.http.get(this.globals.baseAPIUrl + '/Userinvite/getAllInvitedUserList')
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

      // delete invitation
      delete(del)
      {
      let promise = new Promise((resolve, reject) => {		
        this.http.post(this.globals.baseAPIUrl + 'Userinvite/delete', del)
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



        // user re-invitation
        ReInvite(UserId)
        {debugger
        let promise = new Promise((resolve, reject) => {		
          this.http.post(this.globals.baseAPIUrl + 'Userinvite/ReInvite', UserId)
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


     //list all type list
  getAllDefaultData(){
	  
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Userinvite/getAllDefaultData')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
        reject(msg);
        //this.globals.isLoading = false;
     //   this.router.navigate(['/pagenotfound']);
          }
        );
    });		
    return promise;
    }



}
