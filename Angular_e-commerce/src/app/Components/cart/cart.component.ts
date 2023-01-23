import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartserviceService } from '../../services/cartservice.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    public _HttpClient: HttpClient,
    private cartService: CartserviceService
  ) {}

  allCartProducts: any = [];
  cartProducts: any = [];
  subtotal: number = 0;
  total: number = 0;
  token: any = localStorage.getItem('token');
  public grandTotal !: number;

  getCartItems() {
    return this.cartService.getCartProducts().subscribe((res) => {
      this.allCartProducts = res;
      this.cartProducts = this.allCartProducts.cartProducts;
      this.subtotal = this.allCartProducts.total;
      this.total = this.allCartProducts.total_quantity;
    });
  }

  addToCard(id: any, amount: any) {
    this.cartService.addToCart(id, amount).subscribe((res) => {
      console.log(res);
      this.getCartItems();
    });
  }

  removeFromCard(id: any) {
    this.cartService.removeFromCart(id).subscribe((res) => {
      console.log(res);
      this.getCartItems();
    });
  }

  removeAllFromCard = (id: any) => {
    this.cartService.emptyFromCart(id).subscribe((res) => {
      console.log(res);
      this.getCartItems();
    });
  };

  ngOnInit() {
    this.getCartItems();
  }
}
