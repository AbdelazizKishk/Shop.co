import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    if (localStorage.getItem('usertoken') !== null) {
      return true;
    } else {
      alert('You are not logged in!');
      return false;
    }
  } else {
    return false;
  }
};
