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

  allOrders: any;
  allPastOrders = [];
  y = [];
  x: any = [];
  cartProducts: any = [];
  subtotal: number = 0;
  total: number = 0;
 myBill :any = [];
  getAllOrders() {
    this._HttpClient
      .get(`http://localhost:5000/orders`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((data) => {
        this.allOrders = data;
   this.allPastOrders=this.allOrders.result;
this.myBill =this.allOrders.bill;

console.log(this.myBill);

const B= Object.assign({}, ...this.myBill);

console.log(B);



      /*   const result = Object.values(
          this.allPastOrders.reduce((res: any, obj: any) => {
            res[obj.order_id] = res[obj.order_id] || [
              {
                order_id: obj.order_id,
                userName: obj.userName,
                phone: obj.phone,
                email: obj.email,
              },

              (this.y = this.allPastOrders.filter((element) => {
                return element['order_id'] == obj.order_id;
              })),
              (this.x = this.y.map((ele) => {
                return [{ title: ele['title'] }, { quantity: ele['quantity'] },{ price: ele['price'] }];
              })),
            ];

            return res;
          }, [])
        ); */




      });

  }

  ngOnInit() {
    this.getAllOrders();
  }
}
