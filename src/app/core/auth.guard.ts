import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);
  if (token.token && !token.isExpired) return true;
  router.navigateByUrl('/login'); 
  return false;
};
