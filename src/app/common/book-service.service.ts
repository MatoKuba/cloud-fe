import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  // GET request to retrieve all books
  getBooks(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  // POST request to add a new book
  addBook(bookData: any): Observable<any> {
    return this.http.post(this.API_URL, bookData);
  }
}