import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  url: string = 'http://localhost:3000/api/auth/login';
  constructor(private http: HttpClient) { }

   //sending userlogin data to server using Post method
   postLoginDetails(username: string, password: string) {
    return this.http.post(this.url, {    
      username: username,
      password: password
    });
  }


}
