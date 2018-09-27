import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-userprofile',
  providers: [UserprofileService],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  CountryList;
	departmentList;
	roleList;
	companyList;
	stateList;
	userEntity;
	submitted;
	btn_disable;
	header;
	// type;
	// message;
	// msgflag;
  constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private UserprofileService: UserprofileService) { }

    ngOnInit() {
      debugger
      this.userEntity = {};
            this.UserprofileService.getAllDefaultData()
            .then((data) => {
              this.CountryList = data['country'];
              this.roleList = data['role'];
              this.companyList = data['company'];
              this.stateList = data['state'];
              this.departmentList = data['department'];
            },
            (error) => {
              //alert('error');
              
            });
        
          let id = this.route.snapshot.paramMap.get('id');
          if (id) {
        
            
                this.header = 'Update';
                this.UserprofileService.getById(id)
                .then((data) => {
                  this.userEntity = data;
                 // alert(this.userEntity.CountryId);
                  if (this.userEntity.CountryId > 0) {
                    this.UserprofileService.getStateList(this.userEntity.CountryId)
                      .then((data) => {
                        this.stateList = data;
                        
                      },
                      (error) => {
                        //alert('error');
                        
                      });
                    }
                    
                  },
                  (error) => {
                    //alert('error');
                  
                  //	this.router.navigate(['/admin/pagenotfound']);
                    this.btn_disable = false;
                    this.submitted = false;
                  });
              }
              else
              {
                this.header = 'Add';
                this.userEntity = {};
                this.userEntity.UserId = 0;
                this.userEntity.CompanyId = 0;
                this.userEntity.DepartmentId = 0;
                this.userEntity.CountryId = 0;
                this.userEntity.StateId = 0;
      
              }
        
          }
        
        
          addUser(userForm) {
          debugger
            
            let id = this.route.snapshot.paramMap.get('id');
            this.submitted = true;
            if (userForm.valid) {
              this.submitted = false;
              //this.btn_disable = true;
              this.UserprofileService.add(this.userEntity)
                .then((data) => {
      
                  if (this.userEntity.CountryId > 0) {
                    this.UserprofileService.getStateList(this.userEntity.CountryId)
                      .then((data) => {
                        this.stateList = data;
                        
                      },
                      (error) => {
                        //alert('error');
                        
                      });
                  }
                 // alert('success');
                 // this.btn_disable = false;
                  //this.submitted = false;
                  this.userEntity = {};
                  userForm.form.markAsPristine();
                  this.globals.message = 'Your profile updated successfully!';
                  this.globals.type = 'success';
                   this.globals.msgflag = true;
                   this.router.navigate(['/userprofile/edit/'+this.globals.authData.UserId]);
                //  this.router.navigate(['home']);
                },
                (error) => {
                  //alert('error');
                  this.btn_disable = false;
                  this.submitted = false;
                  
                  //this.router.navigate(['/admin/pagenotfound']);
                });
            }
          }
        
          clearForm(userForm) {
            this.userEntity = {};
            this.userEntity.UserId = 0;
            this.userEntity.CompanyId = 0;
            this.userEntity.DepartmentId = 0;
            this.userEntity.CountryId = 0;
            this.userEntity.StateId = 0;
            this.submitted = false;
            userForm.form.markAsPristine();
          }
      
          getStateList(userForm) {
            userForm.form.controls.StateId.markAsDirty();
            this.userEntity.StateId='';
            if (this.userEntity.CountryId > 0) {
              this.UserprofileService.getStateList(this.userEntity.CountryId)
                .then((data) => {
                  this.stateList = data;
                },
                (error) => {
                  //alert('error');
                });
            } else {
              this.stateList = [];
            }
          }
        
        }
        
      
      