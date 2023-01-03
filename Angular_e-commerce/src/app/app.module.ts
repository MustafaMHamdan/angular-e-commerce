import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

 import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule ,HttpErrorResponse } from '@angular/common/http';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

const appRoutes:Routes=[
{path:"products",component:ProductsComponent },
{path:"cart",component:CartComponent },
{path:"login",component:SignInComponent },
{path:"signup",component:SignUpComponent },

]
  @NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    ProductsComponent,
    OrdersComponent,
    CartComponent,
    ProductDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,

   ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),MatDialogModule,

    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
