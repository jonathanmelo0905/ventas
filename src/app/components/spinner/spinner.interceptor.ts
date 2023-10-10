import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private readonly services: DataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.services.show();
    return next.handle(request).pipe(
      finalize(() => this.services.hide())
    );
  }
}
