import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _HttpClient: HttpClient,
    private serviceProducts: ProductsService
  ) {}

  token: any = localStorage.getItem('token');

  myProduct: any = this.serviceProducts.product;

  deleteProduct() {
    this._HttpClient
      .delete(`http://localhost:5000/products/${this.data}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe({
        next: (v) => {
          console.log(v);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => console.info('complete'),
      });
  }
}
