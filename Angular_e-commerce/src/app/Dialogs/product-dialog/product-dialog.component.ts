import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent {
  registerForm!: FormGroup;

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
      category: ['', [Validators.required]],
    });
  }

  url: any;

  onselectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }

  addNewProduct() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    this.api.addToProduct(this.registerForm.value).subscribe((res) => {
      console.log(res);

      this.dialogRef.close();
    });
  }
}
