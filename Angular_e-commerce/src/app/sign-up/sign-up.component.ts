import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
  @Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})


export class SignUpComponent {
  constructor(public _HttpClient: HttpClient,) {}
  msg:any = ''
  errorMsg:any = ''
  massage:any = {}

  signUp(form: NgForm){
    this._HttpClient
      .post(`http://localhost:5000/register`, form)
      .subscribe({
        next: (v) => {this.massage=v,this.msg=this.massage.massage} ,
        error: (e) => this.msg=e.error.massage,
        complete: () => console.info('complete')
    } );



  }
}
