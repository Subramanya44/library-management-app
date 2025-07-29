import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'available-books',
    loadComponent: () => import('./available-books/available-books.component').then(m => m.AvailableBooksComponent)
  },
  {
    path: 'borrowed-books',
    loadComponent: () => import('./borrowed-books/borrowed-books.component').then(m => m.BorrowedBooksComponent)
  }
];
