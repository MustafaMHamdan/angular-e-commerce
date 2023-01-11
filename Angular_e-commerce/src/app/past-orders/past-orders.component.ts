import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss'],
})
export class PastOrdersComponent {
  constructor(public _HttpClient: HttpClient) {}

  token: any = localStorage.getItem('token');

  allCartProducts: any = [];
  cartProducts: any = [];
  subtotal: number = 0;
  total: number = 0;

  getAllOrders() {
    this._HttpClient
      .get(`http://localhost:5000/orders`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnInit(){

    this.getAllOrders()
  }
}
