import { Component } from '@angular/core';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private cartProducts: CartserviceService) {}

  myCarts: any;
  token: any = localStorage.getItem('token');
  myCartProducts:[]=[];
  totalCart:number=0
  signOut() {
    localStorage.clear();
  }

  gitMyCart = () => {
    this.cartProducts.getCartProducts().subscribe((res) => {
      this.myCarts = res;
     this.myCartProducts= this.myCarts.cartProducts
     console.log(this.myCartProducts);
    this.totalCart=this.myCarts.total_quantity

    });
    console.log(this.myCartProducts);
  };

  ngOnInit() {
    this.gitMyCart();

  }
}
