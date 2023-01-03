import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,public _HttpClient: HttpClient,) {}

  token: any = localStorage.getItem('token');




  addNewProduct(form: NgForm){
    this._HttpClient
    .post(`http://localhost:5000/products`, form,  {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
    .subscribe({
      next: (v) => {console.log(v);
      } ,
      error: (e) => {console.log(e);
      },
      complete: () => console.info('complete')
  } );


  }


}
