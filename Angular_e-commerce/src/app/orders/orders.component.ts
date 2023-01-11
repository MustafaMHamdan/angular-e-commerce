import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  constructor(public _HttpClient: HttpClient) {}

  allCartProducts: any = [];
  cartProducts: any = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  token: any = localStorage.getItem('token');

  getCartItems() {
    this._HttpClient
      .get(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((data) => {
        this.allCartProducts = data;

        this.cartProducts = this.allCartProducts.cartProducts;
        this.subtotal = this.allCartProducts.total;
        this.tax = this.subtotal * 0.14;
        this.total = this.tax + this.subtotal;
      });
  }

  submitOrder() {


    this._HttpClient
      .delete(`http://localhost:5000/orders`, {
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
      window.location.reload();
  }

  ngOnInit() {
    this.getCartItems();
  }
}
