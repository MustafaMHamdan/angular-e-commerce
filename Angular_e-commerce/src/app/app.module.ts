import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { ProductsComponent } from './Components/products/products.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { CartComponent } from './Components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,

  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ProductDialogComponent } from './Dialogs/product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './Dialogs/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './Dialogs/edit-dialog/edit-dialog.component';
import { CartserviceService } from './services/cartservice.service';
import { PastOrdersComponent } from './Components/past-orders/past-orders.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from './filter.pipe';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { NotificationsInterceptor } from './Interceptors/notifications-.interceptor';
import { NotificationComponent } from './Components/notification/notification.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'order', component: OrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'orders-history',
    component: PastOrdersComponent,
    canActivate: [AuthGuard],
  },
];
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
    PastOrdersComponent,
 
    FilterPipe,
    OrderDetailsComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,

    FormsModule,
    HttpClientModule,BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    CartserviceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationsInterceptor,
      multi: true
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
