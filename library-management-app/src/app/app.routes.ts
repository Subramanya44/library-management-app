import { Routes } from '@angular/router';
import { adminGuard } from './core/admin.guard';
import { userGuard } from './core/user.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'user',
    canActivate: [userGuard],
    loadChildren: () => import('./user/user.routes').then(m => m.USER_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
