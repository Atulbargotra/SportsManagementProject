import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SignIn} from '../Model/signIn'
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  url: string = 'http://localhost:3000/api/auth/login';
  constructor(private http: HttpClient) { }

   //sending userlogin data to server using Post method
   postLoginDetails(signIn:SignIn) {
    return this.http.post(this.url,signIn);
  }
}
