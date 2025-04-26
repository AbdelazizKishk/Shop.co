import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('usertoken');
  if (userToken) {
    req = req.clone({
      setHeaders: {
        token: userToken,
      },
    });
  }
  return next(req);
};
