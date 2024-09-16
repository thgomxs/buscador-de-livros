import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Note } from '../models/note.model';

import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _apiURL = environment.apiURL;
  private favoritesSubject = new BehaviorSubject<Book[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private toastService: ToastService,
    private _authService: AuthService
  ) {
    this.getFavorites();
  }

  getFavorites() {
    return this._httpClient
      .get<Book[]>(
        `${this._apiURL}?username=${this._authService.getUsername()}`
      )
      .subscribe((favorites) => this.favoritesSubject.next(favorites));
  }

  addNote(id: string, note: Note) {
    return this.getNotes(id).pipe(
      switchMap((notesArray) => {
        notesArray?.push(note);
        const newNotes = notesArray;

        return this._httpClient.patch<void>(`${this._apiURL}/${id}`, {
          notes: newNotes,
        });
      }),
      tap(() => this.getFavorites())
    );
  }

  deleteNote(id: string, noteID: string) {
    return this.getNotes(id).pipe(
      switchMap((notesArray) => {
        const newNotes = notesArray?.filter((note) => note.id !== noteID);

        return this._httpClient.patch<void>(`${this._apiURL}/${id}`, {
          notes: newNotes,
        });
      }),
      tap(() => this.getFavorites())
    );
  }

  editNote(id: string, newNote: any) {
    return this.getNotes(id).pipe(
      switchMap((notesArray) => {
        const newNotes = notesArray?.map((note: any) => {
          if (note.id == newNote.id) {
            note = newNote;
          }

          return note;
        });

        return this._httpClient.patch<void>(`${this._apiURL}/${id}`, {
          notes: newNotes,
        });
      }),
      tap(() => this.getFavorites())
    );
  }

  getNotes(id: string) {
    return this._httpClient.get<Book>(`${this._apiURL}/${id}`).pipe(
      map((book) => {
        return book.notes;
      })
    );
  }

  setRate(id: string, rate: number) {
    this._httpClient
      .patch<void>(`${this._apiURL}/${id}`, { rate: rate })
      .pipe(tap(() => this.getFavorites()))
      .subscribe({
        error: (error) => console.error('Error seting rate!', error),
        complete: () => {
          console.log(`Rate updated! ID: ${id}`);
        },
      });
  }

  addFavoriteBook(book: Book) {
    console.log('Add acionado');
    book.username = this._authService.getUsername();
    book.rate = 0;
    book.notes = [];
    book.createdAt = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    this.favorites$.pipe(take(1)).subscribe((favorites) => {
      const selectedFavorite = favorites.filter(
        (favorite) => favorite.id == book.id
      );

      if (selectedFavorite.length > 0) {
        this.toastService.toastError('Este livro já está nos seus favoritos!');
      } else {
        this._httpClient
          .post<Book>(this._apiURL, book)
          .pipe(tap(() => this.getFavorites()))
          .subscribe({
            error: (error) => {
              this.toastService.toastError(
                'Erro ao adicionar livro aos favoritos!'
              );

              console.log(error);
            },
            complete: () => {
              this.toastService.toastSuccess('Livro adicionado aos favoritos!');
            },
          });
      }
    });
  }

  deleteFavoriteBook(id: string) {
    this._httpClient
      .delete<void>(`${this._apiURL}/${id}`)
      .pipe(tap(() => this.getFavorites()))
      .subscribe({
        error: (error) => console.error('Error deleting book!', error),
        complete: () => {
          console.log(`Book deleted! ID: ${id}`);
        },
      });
  }
}
