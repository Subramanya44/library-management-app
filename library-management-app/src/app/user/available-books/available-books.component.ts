import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../core/book.service';
import { TransactionService } from '../../core/transaction.service';
import { AuthService } from '../../core/auth.service';
import { Book } from '../../models/book.model';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.css'],
  imports: [CommonModule, RouterModule]
})
export class AvailableBooksComponent implements OnInit {
  availableBooks: Book[] = [];
  userId!: number;
  message = '';

  constructor(
    private bookService: BookService,
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id !== undefined) {
      this.userId = currentUser.id;
      this.availableBooks = this.bookService.getBooks();
    } else {
      this.message = 'User not found. Please login again.';
    }
  }
  

  borrow(bookId: number): void {
    const success = this.transactionService.borrowBook(bookId, this.userId);
    this.message = success ? 'Book borrowed successfully!' : 'Already borrowed!';
  }
}
