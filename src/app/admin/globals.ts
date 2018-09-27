import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';


@Injectable()
export class Globals { 

  constructor() { }
  
    
    baseAPIUrl: string = environment.baseUrl+'/api/';  
    baseUrl: string = environment.baseUrl;
    headerpath: string = "{'Content-Type': 'application/json','Accept': 'application/json'}";
    IsLoggedIn: boolean = false;
    currentLink: string = '';
    authData = localStorage.getItem('token') ? new JwtHelper().decodeToken(localStorage.getItem('token')):null;
    isLoading: boolean = false;
    msgflag = false;
    message = '';
    type = '';
    IsAdmin = true;
}