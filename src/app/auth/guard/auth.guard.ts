import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router =new Router();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user_id');
    if (token && user) {
      return true;
    } else {
      router.navigate(["auth"]);
      // Token does not exist, redirect to login or another page      
      return false;
    }
};
