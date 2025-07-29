import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../core/book.service';
import { Book } from '../../models/book.model';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.books = this.bookService.getBooks();
  }

  editBook(bookId: number) {
    this.router.navigate(['/admin/book-form', bookId]);
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId);
    this.books = this.bookService.getBooks(); // Refresh
  }

  addNewBook() {
    this.router.navigate(['/admin/book-form']);
  }
}
