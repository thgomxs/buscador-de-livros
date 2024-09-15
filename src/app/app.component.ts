import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { FavoriteService } from './services/favorite.service';
import { Title } from '@angular/platform-browser';
import { Book } from './models/book.model';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  books: any[] = [];
  query: string = '';
  searchBooksForm: FormGroup;

  constructor(
    private _bookService: BookService,
    private _favoriteService: FavoriteService
  ) {}

  searchBooks() {
    this.searchBooksForm
      .get('searchBooksQuery')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((query) => {
        this._bookService.getBooks(query).subscribe((data: Book[]) => {
          this.books = data.map((book) => {
            this._favoriteService.favorites$
              .pipe(take(1))
              .subscribe((favorites) => {
                favorites.forEach((favorite) => {
                  if (favorite.id == book.id) {
                    book.favorite = true;
                  } else {
                    book.favorite = false;
                  }
                });
              });

            return book;
          });
        });
      });
  }

  toggleFavoriteBook(id: string) {
    const book: Book = this.books.filter((book) => book.id == id)[0];

    if (book.favorite) {
      book.favorite = false;
      this._favoriteService.deleteFavoriteBook(id);
    } else {
      book.favorite = true;
      this._favoriteService.addFavoriteBook(book);
    }
  }

  ngOnInit() {
    this.searchBooksForm = new FormGroup({
      searchBooksQuery: new FormControl(''),
    });

    this.searchBooks();
  }
}
