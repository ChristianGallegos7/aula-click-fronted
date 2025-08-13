import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService);
  const router = inject(Router);

  let r = req;
  const t = token.token;
  if (t && !token.isExpired) r = req.clone({ setHeaders: { Authorization: `Bearer ${t}` } });

  return next(r).pipe(
    catchError(err => {
      if (err.status === 401) {
        token.clear();
        router.navigateByUrl('/login');
      }
      return throwError(() => err);
    })
  );
};
