import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { UsersComponent } from './users/users.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProfileComponent } from './profile/profile.component';
import { adminGuard } from '../core/admin.guard';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book-form', component: BookFormComponent },
  { path: 'book-form/:id', component: BookFormComponent },
  { path: 'users', component: UsersComponent },
  { path: 'transactions', component: TransactionsComponent },
  {
    path: 'transactions',
    loadComponent: () => import('../admin/transactions/transactions.component').then(m => m.TransactionsComponent),
    canActivate: [adminGuard]
  },
  { path: 'profile', component: ProfileComponent },
];

