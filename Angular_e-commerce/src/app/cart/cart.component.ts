import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(public _HttpClient: HttpClient) {}

  allCartProducts: any = [];
  cartProducts: any = [];
  subtotal: Number =0;

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
        console.log(data);

        this.cartProducts = this.allCartProducts.cartProducts;
        this.subtotal=this.allCartProducts.total
      });
  }

  removeFromCard(id: any) {
    this._HttpClient
      .put(
        `http://localhost:5000/cart/${id}`,
        {},
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

    this.getCartItems();
  }

  ngOnInit() {
    this.getCartItems();
  }
}
