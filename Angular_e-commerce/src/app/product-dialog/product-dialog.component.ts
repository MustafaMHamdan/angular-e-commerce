import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent {
  constructor(private  route : Router,
    private api: ProductsService,
    public dialogRef: MatDialogRef<ProductDialogComponent>
  ) {}

  token: any = localStorage.getItem('token');
  msg: any = '';
  errorMsg: any = '';
  massage: any = {};

  addNewProduct(form: NgForm) {
    this.api.addToProduct(form).subscribe({
      next: (v) => {
        (this.massage = v), (this.msg = this.massage.massage);

      },
      error: (e) => {(this.msg = e.error.massage),console.log(this.msg);
      },
      complete: () => console.info('complete'),
    });
  }
}
