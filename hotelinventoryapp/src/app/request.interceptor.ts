import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request Interceptor', req);


  if (req.method === 'POST') {
    const newReq = req.clone({
      headers: new HttpHeaders({
        token: '1234567890',
      }),
    });
    return next(newReq);
  }

  return next(req);
};
