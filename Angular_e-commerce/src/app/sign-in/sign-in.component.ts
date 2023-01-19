import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements AfterViewInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    public _HttpClient: HttpClient,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}
  @ViewChild('Myemail') emailF!: ElementRef<HTMLInputElement>;
  msg: any = '';
  errorMsg: any = '';
  massage: any = '';
  token: any = '';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit() {
    this.emailF.nativeElement.focus();
  }
  signIn() {
    this.registerForm.markAllAsTouched();
    console.log(this.registerForm.value);

    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }

    this._HttpClient
      .post(`http://localhost:5000/login`, this.registerForm.value)
      .subscribe({
        next: (v) => {
          (this.token = v),
            localStorage.setItem('token', this.token.token),
            localStorage.setItem('role', this.token.result[0].role_id),
            localStorage.setItem('userId', this.token.result[0].UserID);
          if (this.token != '') {
            this.route.navigate(['/products']).then(() => {
              window.location.reload();
            });
          } else {
            return;
          }

          console.log(v);
        },
        error: (e) => (this.msg = e.error.message),
        complete: () => console.info('complete'),
      });
  }
}
