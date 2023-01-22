import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationsInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request);

    if (request.url.endsWith('products')) {
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status == 201 && event.body) {
              console.log(request.body.title);

              if (request.body.title.length == 1) {
                this.toastr.warning('short title ');
              }
              else
              {this.toastr.success('your product has been added successfully');}
            }
          }
          return event;
        })
      );
    } else if (request.url.endsWith('orders')) {
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status == 201 && event.body) {


              this.toastr.success('your order has been submitted');
            }
          }

          return event;
        })
      );
    } else if (request.method === 'DELETE') {
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status == 202 && event.body) {
              this.toastr.success('your product has been deleted successfully');
            }
          }
          return event;
        })
      );
    } else if (request.method === 'PUT') {
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status == 202 && event.body) {
              console.log(request);

              this.toastr.success('your product has been updated successfully');
            }
          }
          return event;
        })
      );
    } 
    console.log(request);

    return next.handle(request);
  }
}
