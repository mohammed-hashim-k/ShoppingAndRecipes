import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {  // adds token to all outgoing requests 
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(
        (authState) => {
          return authState.user;
        }
      ),
      exhaustMap((user) => {
        if (!user) return next.handle(req);
        const modifiedReq = req.clone({params:new HttpParams().set('auth',user.token)})
        return next.handle(modifiedReq);
      })
    );
  }
}
