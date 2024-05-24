import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Book } from './Model/Book';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  private GetApi = 'http://localhost:8081/books/GetAllBooks';
  private AddApi = 'http://localhost:8081/books/AddBook';
  private updateApi = 'http://localhost:8081/books/updatebook';
  private deleteApi = 'http://localhost:8081/books/deletebook/'




  constructor(private http: HttpClient) { }


  getBooks(page: number = 0, size: number = 10): Observable<Book[]> {
    return this.http.get<{ content: Book[] }>(`${this.GetApi}?page=${page}&size=${size}`).pipe(
      map(response => response.content), // extraction du tableau de livres
      catchError(this.handleError)
    );
  }
  
  
  addBook(book: any): Observable<Book> {
    return this.http.post<Book>(this.AddApi, book).pipe(
      catchError(this.handleError)
    );
  }
  updateBook(id: number, book: any): Observable<Book> {
    const url = `${this.updateApi}/${id}`;
    return this.http.put<Book>(url, book).pipe(
      catchError((error) => {
        console.error('Error updating book:', error);
        return throwError('An error occurred while updating the book. Please try again later.');
      })
    );
  }
  getBookById(id: any) {
    return this.http.get<Book>('http://localhost:8081/books/GetbookbyId/'+id);
  }
  

   deleteBook(idbook: any): Observable<any> {
    return this.http.delete(this.deleteApi + idbook).pipe(
      catchError((error : any) => { 
        console.error('Error deleting book:', error);
        return throwError('An error occurred while deleting the book. Please try again later.');
      })
    );
  }
   private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
  
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage); 
    return throwError(() => new Error(errorMessage)); 
  }

}
