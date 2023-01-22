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
    if (request.url.endsWith('products')) {
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status == 201 && event.body) {
              this.toastr.success('your product has been added successfully');
            }
 return event;
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
    }

    return next.handle(request);
  }
}
