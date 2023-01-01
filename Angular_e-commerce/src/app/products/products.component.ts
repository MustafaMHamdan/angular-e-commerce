import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(public _HttpClient: HttpClient,   ) {}

  allProducts: any = [];
  Products: any = [];
counter:number=0
  token: any = localStorage.getItem('token');


  getProducts() {
    this._HttpClient.get(`http://localhost:5000/products`).subscribe((data) => {
      this.allProducts = data;
      this.Products = this.allProducts.All_Products;
      console.log(this.Products);
    });
  }

  addToCard(id: any) {
    this._HttpClient
      .post(
        `http://localhost:5000/products/${id}`,
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
      this.counter++
  }






  ngOnInit() {
    this.getProducts();
  }
}
