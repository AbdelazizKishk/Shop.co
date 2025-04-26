import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const id = inject(PLATFORM_ID);

  if (isPlatformBrowser(id)) {
    if (localStorage.getItem('usertoken') !== null) {
      alert('You are already logged in!');
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
