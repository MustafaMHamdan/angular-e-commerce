import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements AfterViewInit {
  registerForm!: FormGroup;
  submitted = false;
  constructor(
    public _HttpClient: HttpClient,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  @ViewChild('Myname') username!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.username.nativeElement.focus();
  }
  msg: any = '';
  errorMsg: any = '';
  massage: any = {};



  signUp() {
   this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }

    this._HttpClient
      .post(`http://localhost:5000/register`, this.registerForm.value)
      .subscribe({
        next: (v) => {
          (this.massage = v), (this.msg = this.massage.massage);
          this.route.navigate(['/login']);
        },
        error: (e) => (this.msg = e.error.massage),
        complete: () => console.info('complete'),
      });
  }
}
