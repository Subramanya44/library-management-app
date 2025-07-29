import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { ProfileComponent } from './profile/profile.component';

export const USER_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'available-books', component: AvailableBooksComponent },
  { path: 'borrowed-books', component: BorrowedBooksComponent },
  { path: 'profile', component: ProfileComponent },
];
