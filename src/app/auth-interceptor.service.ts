import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {TokenStorageService} from './demo/modules/auth/services/token-storage.service.js';
import {Injectable} from '@angular/core';
import {catchError, map, retry, take, tap} from 'rxjs/operators';
import {log} from 'util';
import {AuthService} from './demo/modules/auth/services/auth.service';
import {throwError} from 'rxjs';
import {ERROR} from '@angular/compiler-cli/src/ngtsc/logging/src/console_logger';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
      if (this.authService.isTokenExpired(token)){
        this.authService.refreshToken().pipe(take(1)).subscribe(data => console.log('DATA' + data), error =>
        console.log('erro' + error))
      }
    }

    return next.handle(authReq).pipe(tap(event => {
        if (event instanceof HttpErrorResponse){
          console.log('HttpErrorResponse');
        }else if (event instanceof HttpResponse){
          console.log("HttpResponse");
        }else if (event instanceof  Error) {
          console.log('error')
        }
        else if (event instanceof  ErrorEvent) {
          console.log('ErrorEvent')
        }
        else {
            console.log('event');
        }
    }))
  }
}

