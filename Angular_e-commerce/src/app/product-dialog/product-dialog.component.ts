import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent {
  constructor(
    private api: ProductsService,
    public dialogRef: MatDialogRef<ProductDialogComponent>
  ) {}

  token: any = localStorage.getItem('token');

  addNewProduct(form: NgForm) {
    this.api.addToProduct(form).subscribe((res) => {
      console.log(res);
    });
  }
}
