import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../core/book.service';
import { TransactionService } from '../../core/transaction.service';
import { User } from '../../models/user.model';
import { Book } from '../../models/book.model';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalBooks = 0;
  totalUsers = 0;
  totalTransactions = 0;
  borrowedBooks = 0;

  constructor(
    private bookService: BookService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const books: Book[] = this.bookService.getBooks();
    const transactions: Transaction[] = this.transactionService.getAllTransactions();
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    this.totalBooks = books.length;
    this.totalUsers = users.length;
    this.totalTransactions = transactions.length;
    this.borrowedBooks = transactions.filter(t => !t.returnDate).length;
  }
}
