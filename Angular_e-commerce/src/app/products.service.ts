import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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

  addToProduct(form: any) {
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


}
