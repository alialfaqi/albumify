import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  const currentUser = localStorage.getItem('authed');

  if (currentUser == 'false') {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
