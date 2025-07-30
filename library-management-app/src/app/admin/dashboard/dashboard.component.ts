import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../core/book.service';
import { TransactionService } from '../../core/transaction.service';
import { AuthService } from '../../core/auth.service';
import { Book } from '../../models/book.model';
import { Transaction } from '../../models/transaction.model';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  transactions: Transaction[] = [];
  users: User[] = [];

  totalBooks = 0;
  totalTransactions = 0;
  activeBorrowings = 0;
  totalUsers = 0;

  constructor(
    private bookService: BookService,
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    this.transactions = this.transactionService.getAllTransactions();
    this.users = this.authService.getAllUsers();

    this.totalBooks = this.books.length;
    this.totalTransactions = this.transactions.length;
    this.activeBorrowings = this.transactions.filter(t => !t.returnDate).length;
    this.totalUsers = this.users.filter(u => u.role === 'user').length;
  }
}
