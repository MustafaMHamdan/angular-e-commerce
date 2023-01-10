import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(public _HttpClient: HttpClient, private router: Router) {}

  allCartProducts: any = [];
  cartProducts: any = [];
  subtotal: Number = 0;

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
        this.subtotal = this.allCartProducts.total;
      });
  }

  addToCard = (id: any) => {
    this._HttpClient
      .post(
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
    window.location.reload();
    /*    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['cart']);
}); */
  };

  removeFromCard = (id: any) => {
    this._HttpClient
      .delete(
        `http://localhost:5000/cart/${id}`,

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
    window.location.reload();
  };

  removeAllFromCard = (id: any) => {
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
    window.location.reload();
  };




  ngOnInit() {
    this.getCartItems();
  }
}
