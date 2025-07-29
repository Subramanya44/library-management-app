import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/transaction.service';
import { BookService } from '../../core/book.service';
import { Transaction } from '../../models/transaction.model';
import { Book } from '../../models/book.model';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css'],
  imports: [CommonModule]
})

export class BorrowedBooksComponent implements OnInit {
  borrowedTransactions: Transaction[] = [];
  borrowedBooks: (Book & { transactionId: number })[] = [];

  constructor(
    private transactionService: TransactionService,
    private bookService: BookService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }

  loadBorrowedBooks(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.borrowedTransactions = this.transactionService.getBorrowedBooksByUser(user.id);
    this.borrowedBooks = this.borrowedTransactions
      .map(transaction => {
        const book = this.bookService.getBookById(transaction.bookId);
        return book ? { ...book, transactionId: transaction.id } : null;
      })
      .filter((b): b is Book & { transactionId: number } => !!b);
  }

  returnBook(bookId: number): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const success = this.transactionService.returnBook(bookId, user.id);
    if (success) {
      alert('Book returned successfully!');
      this.loadBorrowedBooks(); // refresh list
    } else {
      alert('Failed to return book.');
    }
  }
}
