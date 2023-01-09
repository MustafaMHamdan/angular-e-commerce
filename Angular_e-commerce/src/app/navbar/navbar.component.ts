import { Component } from '@angular/core';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
constructor( private cartProducts: CartserviceService){}



  myCarts:any
  token: any = localStorage.getItem('token');

  signOut() {
    localStorage.clear();
  }


ngOnInit(){
  this.cartProducts.getProducts().subscribe(res=>{
    this.myCarts = res
    console.log(this.myCarts);

  })
}



}
