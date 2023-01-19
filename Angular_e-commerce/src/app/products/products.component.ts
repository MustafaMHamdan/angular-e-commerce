import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

import { CartserviceService } from '../cartservice.service';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';

  constructor(
    private api: ProductsService,
    private cartService: CartserviceService,
    public dialog: MatDialog,private route: Router
  ) {}

  amount: number = 0;
  allProducts: any = [];
  Products: any = [];
  counter: number = 0;
  token: any = localStorage.getItem('token');
  role: any = localStorage.getItem('role');
  userId: any = localStorage.getItem('userId');

  ngOnInit(): void {
    this.getProducts();
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  filter(category: string) {
    console.log(this.filterCategory);

    this.filterCategory = this.allProducts.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }

  checkLogin() {
    if (!this.token) {
      alert('Please login first');
      this.route.navigate(['/login']);
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ProductDialogComponent, {
      width: '400px',
     
      exitAnimationDuration,
      enterAnimationDuration,
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getProducts();
    });
  }

  deleteDialog(id: any, title: any): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { id, title },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getProducts();
    });
  }

  editDialog(id: any, title: any, price: any, image: any, category: any): void {
    this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: {
        id,
        title,
        price,
        image,
        category,
      },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getProducts();
    });
  }

  getProducts() {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.allProducts = this.productList.All_Products;
      this.filterCategory = res.All_Products;

      this.allProducts = this.allProducts.map((e: any) => {
        return { ...e, counter: 1 };
      });
      this.filterCategory = this.allProducts.map((e: any) => {
        return { ...e, counter: 1 };
      });
      console.log(this.allProducts);
    });
  }

  addToCard(id: any, amount: number) {
    if (!this.token) {
      alert('Please login first');
      this.route.navigate(['/login']);
    }
    this.cartService.addToCart(id, amount).subscribe((res) => {
      console.log(res);
      console.log(amount);
    });
  }
  decreaseValue(value: any, index: any) {
    if (value <= 1) {
      return;
    } else {
      this.filterCategory[index].counter =
        this.filterCategory[index].counter - 1;
    }
  }
}
