import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.context.get(SkipLoading)) {
      // Pass the request directly to the next handler
      return next.handle(req);
    }
    this.loadingService.loadingOn();
    return next.handle(req).pipe(
      finalize(() => {
        // Turn off the loading spinner
        this.loadingService.loadingOff();
      })
    );
  }
}
