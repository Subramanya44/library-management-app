import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { BookService } from '../../core/book.service';
import { TransactionService } from '../../core/transaction.service';
import { User } from '../../models/user.model';
import { Book } from '../../models/book.model';
import { Transaction } from '../../models/transaction.model';

@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  books: Book[] = [];
  transactions: Transaction[] = [];

  totalBooks = 0;
  borrowedBooks = 0;
  activeTransactions = 0;

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.books = this.bookService.getBooks();
  
    this.transactions = this.transactionService.getTransactionsByUser(String(this.user?.id || '0'));

    this.totalBooks = this.books.length;
    this.borrowedBooks = this.transactions.filter(t => !t.returnDate).length;
    this.activeTransactions = this.transactions.length;
  }
  
}
