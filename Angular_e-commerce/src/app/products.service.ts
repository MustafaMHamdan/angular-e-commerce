import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  token: any = localStorage.getItem('token');
  getProduct() {
    return this.http.get<any>('http://localhost:5000/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addToProduct(form: NgForm) {
    return this.http.post(
      `http://localhost:5000/products`,
      form,

      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

/*   deleteProduct(id: any) {
    return this.http.delete(
      `http://localhost:5000/products${id}`,

      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  } */

/*   updateProduct(form: NgForm) {
    return this.http.put(
      `http://localhost:5000/products/${this.data}`,
      form,

      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  } */
}
