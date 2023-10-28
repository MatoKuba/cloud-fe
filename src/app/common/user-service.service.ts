import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  // GET request to retrieve all users
  getUsers(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  // POST request to add a new user
  addUser(userData: { firstName: string, lastName: string }): Observable<any> {
    return this.http.post(this.API_URL, userData);
  }
}