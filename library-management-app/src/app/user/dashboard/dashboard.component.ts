import { Component } from '@angular/core';
import { BookService } from '../../core/book.service';
import { Book } from '../../models/book.model';
import { AuthService } from '../../core/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentUser: User | null = null;
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadBooks();
  }

  loadBooks(): void {
    this.books = this.bookService.getBooks();
  }
}
