import { Component, OnInit } from '@angular/core';
import { BookserviceService } from '../bookservice.service';
import { Book } from '../Model/Book';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: any = {}; 
  bookForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage?: string;


  constructor(private bookService: BookserviceService,private route : Router,private fb: FormBuilder) {
  }
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
      ],
      publicationYear: ['', Validators.required]
    });
      
  }

  get isbn() {
    return this.bookForm.get('isbn');
  }
  
  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(
        (response) => {
          console.log('Book added successfully:', response);
          this.successMessage = 'Book added successfully!';
          setTimeout(() => {
            this.route.navigate(['/']);
          }, 2000);
        },
        (error) => {
          console.error('Error adding book:', error);
          this.errorMessage = 'An error occurred while adding the book. Please try again later.';
          this.retryRequest(this.bookForm.value); 
        }
      );
    }
  }
  
  retryRequest(book: any): void {
    this.errorMessage = null; 
    this.bookService.addBook(book).subscribe(
      (response) => {
        console.log('Book added successfully on retry:', response);
        this.route.navigate(['/']);
      },
      (error) => {
        console.error('Error adding book on retry:', error);
        this.errorMessage = 'An error occurred while adding the book. Please try again later.';
      }
    );
  }
  

}
