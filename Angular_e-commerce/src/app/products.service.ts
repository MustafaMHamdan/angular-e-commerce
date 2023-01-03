import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public _HttpClient: HttpClient) { }
  AllProducts:any
  product:any
  
  getProducts() {
    this._HttpClient.get(`http://localhost:5000/products`).subscribe((data) => {
      this.AllProducts = data;
      this.product = this.AllProducts.All_Products;
      console.log(this.product);
    });
  }



}
