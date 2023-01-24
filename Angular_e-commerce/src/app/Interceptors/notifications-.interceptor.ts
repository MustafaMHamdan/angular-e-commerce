import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../Components/notification/alert.service';

@Injectable()
export class NotificationsInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private alertService: AlertService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status != 200 && event.body) {
            if (request.url.endsWith('products')) {
              if (event.body.result[0].length == 1) {
                this.alertService.create(
                  'warning',
                  'info',
                  5000,
                  `Your Product Title is too short`
                );
              } else {
                console.log(event.body.massage);

                this.alertService.create(
                  'Success',
                  'success',
                  5000,
                  `${event.body.massage}`
                );
              }
            } else {
              console.log(event.body.massage);

              this.alertService.create(
                'Success',
                'success',
                5000,
                `${event.body.massage}`
              );
            }
          }
        }

        return event;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('event error');
          } else {
            this.alertService.create(
              'Error',
              'danger',
              5000,
              `${error.error.massage}`
            );
          }
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
