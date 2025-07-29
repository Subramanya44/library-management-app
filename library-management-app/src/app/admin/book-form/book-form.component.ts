import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../core/book.service';
import { Book } from '../../models/book.model';

@Component({
  standalone: true,
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.bookId = +paramId;
      const book = this.bookService.getBookById(this.bookId);
      if (book) {
        this.bookForm.patchValue(book);
      }
    }
  }

  saveBook() {
    if (this.bookForm.invalid) return;

    const book: Book = {
      id: this.bookId || Date.now(),
      ...this.bookForm.value,
    };

    if (this.bookId) {
      this.bookService.updateBook(book);
    } else {
      this.bookService.addBook(book);
    }

    this.router.navigate(['/admin/book-list']);
  }
}
