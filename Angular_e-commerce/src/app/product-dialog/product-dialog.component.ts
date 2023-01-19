import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private api: ProductsService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  token: any = localStorage.getItem('token');
  msg: any = '';
  errorMsg: any = '';
  massage: any = {};

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: [''],
    });
  }

  addNewProduct() {
    this.submitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    this.api.addToProduct(this.registerForm.value).subscribe((res) => {
      console.log(res);
    });
  }
}
