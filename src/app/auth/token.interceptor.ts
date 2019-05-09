import { AuthService } from './../service/user/auth.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class MyInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // how to update the request Parameters
        const updatedRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
        });
        // logging the updated Parameters to browser's console
        console.log('Before making api call : ', updatedRequest);
        return next.handle(updatedRequest).pipe(
            tap(
                event => {
                    // logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                        console.log('api call success :', event);
                    }
                },
                error => {
                    // logging the http response to browser's console in case of a failuer
                    // tslint:disable-next-line: deprecation
                    if (event instanceof HttpResponse) {
                    // tslint:disable-next-line: deprecation
                        console.log('api call error :', event);
                    }
                }
            )
        );
    }
}