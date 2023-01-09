import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(public _HttpClient: HttpClient) { }

  AllCartProducts:any
  cartProduct:any

  getProducts() {
    return this._HttpClient.get(`http://localhost:5000/cart`)
    ;
  }






}
