import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../core/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { BookService } from '../../core/book.service';
import { AuthService } from '../../core/auth.service';
import { User } from '../../models/user.model';
import { Book } from '../../models/book.model';

@Component({
  standalone: true,
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [CommonModule]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  users: User[] = [];
  books: Book[] = [];

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('users');
    this.users = userData ? JSON.parse(userData) : [];

    this.books = this.bookService.getBooks();
    this.transactions = this.transactionService.getAllTransactions();
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find(b => b.id === bookId);
    return book ? book.title : 'Unknown';
  }
}
