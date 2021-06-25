import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SigninService } from 'src/app/services/signin.service';

import {SignIn} from '../../Model/signIn'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private signinService: SigninService,
    private toast: ToastrService,
    private route: Router
  ) {}

  username: string;
  password: string;

  ngOnInit(): void {}

  //sending Login data to server through service and getting back response
  loginButton() {
    const signIn:SignIn = {
      username: this.username,
      password: this.password
    }
    this.signinService
      .postLoginDetails(signIn)
      .subscribe((data) => {
        //resposne in json       
        let result = JSON.parse(JSON.stringify(data));
        
        console.log(result);

        if (result.message === 'valid') {
          
          if (result.type == 'User') {
            this.toast.success(`${result.type} Login Sucessfully`);
            this.route.navigateByUrl('/userhome');
          }
          if (result.type == 'Admin') {
            this.toast.success(`${result.type} Login Sucessfully`);
            this.route.navigateByUrl('/adminhome');
          }
        } else {
          this.toast.error('Invalid Username and Password');
        }
      });
  }
}
