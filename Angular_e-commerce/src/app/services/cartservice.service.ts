import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  public AllCartProducts: any = [];
  public search = new BehaviorSubject<string>("");
  token: any = localStorage.getItem('token');

  constructor(public _HttpClient: HttpClient) {}

  getCartProducts() {
    return this._HttpClient.get<any>('http://localhost:5000/cart', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  addToCart(id: any, amount: any) {
    return this._HttpClient.post(
      `http://localhost:5000/cart/${id}`,
      { amount: amount },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  removeFromCart(id: any) {
    return this._HttpClient.put(
      `http://localhost:5000/cart/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  emptyFromCart(id: any) {
    return this._HttpClient.delete(`http://localhost:5000/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
