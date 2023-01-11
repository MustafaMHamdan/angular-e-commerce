import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(
    public _HttpClient: HttpClient,
    public dialog: MatDialog,
    amount: ElementRef<HTMLInputElement>,private  router : Router
  ) {}

  amount: number = 0;
  allProducts: any = [];
  Products: any = [];
  counter: number = 0;
  token: any = localStorage.getItem('token');
  role: any = localStorage.getItem('role');
  userId: any = localStorage.getItem('userId');

  openDialog(): void {
    console.log(this.role);

    this.dialog.open(ProductDialogComponent, {
      width: '250px',
      height: '250px'
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getProducts();
    });
  }

  deleteDialog(id: any): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: id,
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getProducts();
    });
  }

  editDialog(id: any): void {
    this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: id,
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getProducts();
    });
  }

  getProducts() {
    this._HttpClient.get(`http://localhost:5000/products`).subscribe((data) => {
      this.allProducts = data;
      this.allProducts.for;
      this.Products = this.allProducts.All_Products;
      this.Products = this.Products.map((e: any) => {
        return { ...e, counter: 1 };
      });
      console.log(this.Products);
    });
  }

  addToCard(id: any, amount: any) {
    this._HttpClient
      .post(
        `http://localhost:5000/products/${id}`,
        { amount: amount },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .subscribe({
        next: (v) => {
          console.log(v);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => console.info('complete'),
      });
   window.location.reload();
   /*   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['products']);
  }) */

  }

  ngOnInit() {
    this.getProducts();
  }
}
