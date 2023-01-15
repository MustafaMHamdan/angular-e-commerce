import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements AfterViewInit {
  constructor(public _HttpClient: HttpClient,private  route : Router) {}

  @ViewChild('username') userName! :ElementRef<HTMLInputElement>
  ngAfterViewInit(): void {
    this.userName.nativeElement.focus()
  }
  msg: any = '';
  errorMsg: any = '';
  massage: any = {};

  signUp(form: NgForm) {
    this._HttpClient.post(`http://localhost:5000/register`, form).subscribe({
      next: (v) => {
        (this.massage = v), (this.msg = this.massage.massage);
        this.route.navigate(['/login'])
      },
      error: (e) => (this.msg = e.error.massage),
      complete: () => console.info('complete'),
    });
  }
}
