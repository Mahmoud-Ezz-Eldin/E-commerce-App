import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookiesService = inject(CookieService);

  if (cookiesService.check('token')) {
    if (
      req.url.includes('cart') ||
      req.url.includes('wishlist') ||
      req.url.includes('orders')
    ) {
      req = req.clone({
        setHeaders: {
          token: cookiesService.get('token'),
        },
      });
    }
  }
  return next(req);
};
