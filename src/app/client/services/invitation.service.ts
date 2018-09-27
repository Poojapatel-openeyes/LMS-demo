import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class InvitationService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  add(InvitationEntity){ 
    debugger
    let promise = new Promise((resolve, reject) => { 
      this.http.post(this.globals.baseAPIUrl + 'Invitationcode/code', InvitationEntity)
      
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

    // getById(UserId){
    //   debugger
    
    //   let promise = new Promise((resolve, reject) => {
    //     this.http.get(this.globals.baseAPIUrl + 'Invitationcode/getById/' + UserId)
    //       .toPromise()
    //       .then(
    //         res => { // Success
    //           resolve(res);
    //         },
    //         msg => { // Error
    //       reject(msg);
    //    //   this.globals.isLoading = false;
    //      // this.router.navigate(['/pagenotfound']);
    //         }
    //       );
    //   });		
    //   return promise;
    //   }  

}
