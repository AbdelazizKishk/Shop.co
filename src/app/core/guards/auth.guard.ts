import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    if (localStorage.getItem('usertoken') !== null) {
      return true;
    } else {
      alert('You are not logged in!');
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
