import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,

  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { CartserviceService } from './cartservice.service';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutoFocusDirective } from './auto-focus.directive';
import { FilterPipe } from './filter.pipe';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NotificationsInterceptor } from './Interceptors/notifications-.interceptor';
import { NotificationComponent } from './notification/notification.component';

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
    AutoFocusDirective,
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
