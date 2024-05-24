import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookserviceService } from '../bookservice.service';
import { Book } from '../Model/Book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
  bookForm!: FormGroup;
  id!: number;
  errorMessage: string | null = null;
  successMessage?: string;
  


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookserviceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/)
        ]
      ],
      author: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/)
        ]
      ],
      isbn: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^(97(8|9)\d{10}|\d{9}[\dX])$/)
        ]
      ],      publicationYear: ['', Validators.required]
    });
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.bookService.getBookById(this.id).subscribe((book: Book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publicationYear: book.publicationYear
        });
      });
    });
  }
  updateBook(): void {
    if (this.bookForm.valid) {
      const updatedBook = { id: this.id, ...this.bookForm.value };
      this.bookService.updateBook(this.id, updatedBook).subscribe(
        updated => {
          console.log('Book updated:', updated);
           this.successMessage = 'Book updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error => {
          console.error('Error updating book:', error);
          this.errorMessage = 'An error occurred while updating the book. Please try again later.';
        }
      );
    } else {
      this.bookForm.markAllAsTouched(); 
    }
  }
  retryRequest(): void {
    this.errorMessage = null; 
    this.updateBook(); 
  }
}




