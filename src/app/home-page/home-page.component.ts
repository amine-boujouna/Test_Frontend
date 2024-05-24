 import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../Model/Book';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BookserviceService } from '../bookservice.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],

})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = [ 'title', 'author', 'publicationDate','isbn','Action'];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  book?:Book[];
  errorMessage: string | null = null;
  errorMessagedelete: string | null = null;
  successMessage?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id?:number;

  constructor(private bookService: BookserviceService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(page: number = 0, size: number = 20): void {
    this.bookService.getBooks(page, size).subscribe({
      next: (books: Book[]) => {
        this.dataSource.data = books;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = "Sorry, something went wrong. Please try again later.";
      }
    });
  }
  

 

  deleteBook(id: number): void {
    this.errorMessagedelete = null;
  
    this.bookService.deleteBook(id).subscribe(
      () => {
        console.log('Book deleted successfully');
        this.successMessage = 'Book deleted successfully!';
        this.resetMessages();
        this.refreshBookList();
      },
      (error) => {
        console.error('Error deleting book:', error);
        this.errorMessagedelete = 'An error occurred while deleting the book. Please try again later.';
      }
    );
  }
  
  
  refreshBookList(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.dataSource.data = books; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  retryRequest(): void {
    this.errorMessage = null; 
    this.loadBooks(); 
  }
  
  resetMessages(): void {
    setTimeout(() => {
      this.successMessage = '';
    }, 3000); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

 
