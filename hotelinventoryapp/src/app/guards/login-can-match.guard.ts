import { CanMatchFn, Route, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginCanMatchGuard: CanMatchFn = (route, segments) => {

  const router = inject(Router);
  const requiredRole = route.data?.['role'] as string | undefined; // 使用 undefined 来处理可选的角色

  if (!requiredRole) {
    return true;
  }

  const userRole = localStorage.getItem('userRole');

  if (userRole === requiredRole) {
    return true;
  } else {
    router.navigate(['/forbidden']);
    return false;
  }

};
