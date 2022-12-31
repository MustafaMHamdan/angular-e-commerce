import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(public _HttpClient: HttpClient) {}

  msg: any = '';
  errorMsg: any = '';
  massage: any = {};

  signIn(form: NgForm) {
    this._HttpClient.post(`http://localhost:5000/login`, form).subscribe({
      next: (v) => {
        /* this.massage=v,this.msg=this.massage.message */ console.log(v);
      },
      error: (e) => (this.msg = e.error.message),
      complete: () => console.info('complete'),
    });
  }
}
