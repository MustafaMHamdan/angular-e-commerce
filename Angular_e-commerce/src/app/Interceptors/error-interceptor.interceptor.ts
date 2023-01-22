import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('event error');
          } else {
            switch (error.status) {
              case 401:
                console.log(error.statusText);
                this.toastr.error(`${error.error.massage} `);
                break;
              case 403:
                console.log(error.statusText);
                this.toastr.error(`${error.error.massage} `);
                break;
              case 404:
                console.log(error.statusText);
                this.toastr.error(`${error.error.massage} `);
                break;
              case 409:
                console.log(error.statusText);
                this.toastr.error(`${error.error.massage} `);
                break;
              case 503:
                console.log(error.statusText);
                this.toastr.error(`${error.error.massage}`);
                break;
            }
          }
        } else {
          console.log('error occurred');
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
