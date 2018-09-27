import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

}
