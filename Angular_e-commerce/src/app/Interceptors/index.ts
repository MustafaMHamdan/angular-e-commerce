import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ErrorInterceptorInterceptor} from './error-interceptor.interceptor'
import { NotificationsInterceptor } from './notifications-.interceptor';
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NotificationsInterceptor,
    multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptorInterceptor,
  multi: true
}

];
