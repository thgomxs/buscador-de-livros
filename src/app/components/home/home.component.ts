import { Component, OnInit } from '@angular/core';

import { FavoriteService } from '../../services/favorite.service';
import { Book } from '../../models/book.model';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  query: string = '';
  searchBooksForm: FormGroup;

  filters = [
    { name: 'Autor', value: 'inauthor' },
    { name: 'Nome', value: '' },
  ];
  selectedFilter = '';

  constructor(
    private _bookService: BookService,
    private _favoriteService: FavoriteService,
    private _authService: AuthService
  ) {}

  onChange(event: Event) {
    console.log(event.target);
  }

  logout() {
    this._authService.logout();
  }

  searchBooks() {
    this.searchBooksForm
      .get('searchBooksQuery')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((query) => {
        this._bookService
          .getBooks(query, this.selectedFilter)
          .subscribe((data: Book[]) => {
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
