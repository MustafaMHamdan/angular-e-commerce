import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(public _HttpClient: HttpClient,
    private  route : Router) {}

  msg: any = '';
  errorMsg: any = '';
  massage: any ='';
  token: any = '';


  signIn(form: NgForm) {
    this._HttpClient.post(`http://localhost:5000/login`, form).subscribe({
      next: (v) => {
        (this.token = v), localStorage.setItem('token', this.token.token),localStorage.setItem('role', this.token.result[0].role_id),localStorage.setItem('userId', this.token.result[0].UserID);
        if(this.token != ''){
          this.route.navigate(['/products'])
          .then(() => {
            window.location.reload();
          });
        }else{
          return ;
        }

        console.log(v);
      ;

      },
      error: (e) => (this.msg = e.error.message),
      complete: () => console.info('complete'),
    });
  }
}

