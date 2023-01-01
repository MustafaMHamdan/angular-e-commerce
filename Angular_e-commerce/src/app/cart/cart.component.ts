import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public _HttpClient: HttpClient) {}



  allCartProducts: any = [];
  cartProducts: any = [];

  token: any = localStorage.getItem('token');

  getCartItems() {
    this._HttpClient.get(`http://localhost:5000/cart`,{
      headers: {
        Authorization: `Bearer ${this.token}`,

    }

    }).subscribe((data) => {
      this.allCartProducts = data;
      console.log(this.allCartProducts);
this.cartProducts=this.allCartProducts.cartProducts
console.log(this.cartProducts);

    });
  }

  ngOnInit() {
    this.getCartItems();
  }

}
