import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private cartService: CartserviceService, private route: Router) {}
  total: number = 0;
  myCarts: any;
  public searchTerm!: string;
  token: any = localStorage.getItem('token');
  allCartProducts: any = [];
  totalCart: number = 0;
  role: any = localStorage.getItem('role');
  signOut() {
    localStorage.clear();
  }

  getCartItems() {
    return this.cartService.getCartProducts().subscribe((res) => {
      this.myCarts = res.cartProducts;

      this.total = this.myCarts.reduce((accumulator: number, element: any) => {
        return accumulator + element.quantity;
      }, 0);

      this.getCartItems();
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  checkLogin() {
    if (!this.token) {
      alert('Please login first');
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getCartItems();
  }
}
