import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _googleApiURL = environment.googleApiURL;

  constructor(private _httpClient: HttpClient) {}

  getBooks(query: string, filter: string) {
    const url = `${this._googleApiURL}?q=${query}+${filter}`;
    return this._httpClient
      .get<{ items: Book[] }>(url)
      .pipe(map((response) => response.items || []));
  }
}
