import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signup.service';

import { UserSignup } from '../../Model/userSignup'
import { AdminSignup } from '../../Model/adminSignup'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  Uemail: string;
  Uusername: string;
  Upassword: string;

  Aemail: string;
  Ausername: string;
  Apassword: string;

  userType: string = 'User';

  adminAccessPassword: string;

  formLoad: boolean=true;

  constructor(
    private route: Router,
    private toast: ToastrService,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {}

  clickUserButton() {
    this.userType = 'User';
    this.formLoad = true;
  }

  clickAdminButton() {
    this.userType = 'Admin';
    this.formLoad = false;
  }

  userSignupButton() {

    const userSignup: UserSignup = {
      username: this.Uusername,
      password: this.Upassword,
      email: this.Uemail,
    }

    this.signupService
      .postUserSignupDetails(userSignup)
      .subscribe((data) => {
        //resposne in json
        const result = JSON.parse(JSON.stringify(data));
        console.log('User Signup status : ' + result); //print "success" if signin successful otherwise "failed"

        if (result.message === 'success') {
          this.toast.success('Registered Successfully');
          this.route.navigateByUrl('/');
        } else {
          this.toast.error('EmailID Already Exists');
        }
      });
  }

  adminSignupButton() {

    const adminSignup: AdminSignup = {
      username: this.Ausername,
      password: this.Apassword,
      email: this.Aemail,
      adminAccessPassword: this.adminAccessPassword,
    }
    this.signupService
      .postAdminSignupDetails(adminSignup)
      .subscribe((data) => {
        //resposne in json
        let result = JSON.parse(JSON.stringify(data));
        console.log('Admin Signup status : ' + result); //print "success" if signin successful otherwise "failed"

        if (result.message === 'success') {
          this.toast.success('Registered Successfully');
          this.route.navigateByUrl('/');
        } else {
          this.toast.error('Invalid AdminAccessKey');
        }
      });
  }
}
