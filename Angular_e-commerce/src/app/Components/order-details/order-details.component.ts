import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _HttpClient: HttpClient
  ) {}

  token: any = localStorage.getItem('token');
  orderD: any;
  subtotal: any = 0;
  user_details: any;
  order_details: any;
  checkOrderDetail() {
    this._HttpClient
      .get(`http://localhost:5000/orders/${this.data.order_id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((res) => {
        this.orderD = res;

        this.user_details = this.orderD.result;
        this.order_details = this.user_details[0][1];

        console.log(this.order_details);
        for (let i = 0; i < this.order_details.length; i++) {
          this.subtotal =
            this.subtotal +
            this.order_details[i].quantity * this.order_details[i].price;
        }
      });
  }

  ngOnInit() {
    this.checkOrderDetail();
  }
}
