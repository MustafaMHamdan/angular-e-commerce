import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss'],
})
export class PastOrdersComponent {
  constructor(public _HttpClient: HttpClient, public dialog: MatDialog) {}

  token: any = localStorage.getItem('token');
  orderdetailes: any = [];
  allOrders: any;
  allPastOrders = [];

  cartProducts: any = [];
  subtotal: number = 0;
  total: number = 0;
  myBill: any = [];

  /////////////////

  getAllOrders() {
    this._HttpClient
      .get(`http://localhost:5000/orders`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((data) => {
        this.allOrders = data;
        this.allPastOrders = this.allOrders.result;
        console.log(this.allOrders.result);

        this.orderdetailes = this.allPastOrders.map((e) => {
          return e[1];
        });
      });
  }

  detailsDialog(order_id: any): void {
    this.dialog.open(OrderDetailsComponent, {
      width: '500px',
      data: { order_id },
    });
  }

  ngOnInit() {
    this.getAllOrders();
  }
}
