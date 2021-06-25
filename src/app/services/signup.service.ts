import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserSignup } from '../Model/userSignup'
import { AdminSignup } from '../Model/adminSignup'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  adminUrl: string = 'http://localhost:3000/api/auth/signup/admin';
  userUrl: string = 'http://localhost:3000/api/auth/signup'

  constructor(private http: HttpClient) {}

  postUserSignupDetails(userSignup: UserSignup) {
    return this.http.post(this.userUrl,userSignup);
   }
 
   postAdminSignupDetails(adminSignup: AdminSignup) {
    return this.http.post(this.adminUrl,adminSignup);
   }
}

