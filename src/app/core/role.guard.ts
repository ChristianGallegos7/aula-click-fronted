import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export const roleGuard: CanActivateFn = (route) => {
  const token = inject(TokenService);
  const router = inject(Router);
  const roles = route.data?.['roles'] as string[] | undefined;
  if (!roles || roles.some(r => token.hasRole(r))) return true;
  router.navigateByUrl('/'); 
  return false;
};
