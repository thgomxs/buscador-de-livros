import { OnInit, Component, QueryList, ViewChildren } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { ToastService } from '../../services/toast.service';

import { Book } from '../../models/book.model';
import { StarRatingComponent } from 'angular-star-rating';
import { debounceTime, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  @ViewChildren(StarRatingComponent)
  starRatingList: QueryList<StarRatingComponent>;

  constructor(
    private _favoriteService: FavoriteService,
    private _toastService: ToastService
  ) {}

  selectedFavorite: any;
  selectedNote: any;
  newNote: string = '';

  searchNotesForm: FormGroup;

  getFavorites() {
    return this._favoriteService.favorites$;
  }

  selectFavorite(favorite: any) {
    this.selectedFavorite = favorite;
    this.selectedFavorite.tags = [];
  }
  selectNote(note: Note) {
    this.selectedNote = note;
  }

  getSelectedNotes() {
    this._favoriteService.favorites$.subscribe((favorites) => {
      favorites.forEach((favorite: any) => {
        if (favorite.id == this.selectedFavorite.id) {
          this.selectedFavorite.notes = favorite.notes;
        }
      });
    });
  }

  addNote() {
    this._favoriteService
      .addNote(this.selectedFavorite.id, {
        id: uuidv4(),
        note: this.newNote,
        tags: this.selectedFavorite.tags,
      })
      .pipe(
        tap(() => {
          this.newNote = '';
        })
      )
      .subscribe({
        error: (error) => {
          this._toastService.toastError('Erro ao adicionar nota!');
        },
        complete: () => {
          this._toastService.toastSuccess('Nota adicionada com sucesso!');
        },
      });
  }
  editNote() {
    this._favoriteService
      .editNote(this.selectedFavorite.id, this.selectedNote)
      .subscribe({
        error: (error) => {
          this._toastService.toastError('Erro ao editar nota!');
        },
        complete: () => {
          this._toastService.toastSuccess('Nota editada com sucesso!');
        },
      });

    this.getSelectedNotes();
  }
  deleteNote() {
    this._favoriteService
      .deleteNote(this.selectedFavorite.id, this.selectedNote.id)
      .subscribe({
        error: (error) => {
          this._toastService.toastError('Erro ao deletar nota!');
        },
        complete: () => {
          this._toastService.toastSuccess('Nota deletada com sucesso!');
        },
      });

    this.getSelectedNotes();
  }

  setRate(favoriteID: string, rate: number) {
    this._favoriteService.setRate(favoriteID, rate);
  }

  onRatingClick = (favoriteID: string) => {
    this.starRatingList.forEach((starRating) => {
      if (starRating.id == favoriteID) {
        this.setRate(favoriteID, starRating.rating);
      }
    });
  };

  deleteFavoriteBook(id: string) {
    this._favoriteService.deleteFavoriteBook(id);
    this._favoriteService.getFavorites();
  }

  ngOnInit() {
    this.searchNotesForm = new FormGroup({
      searchNotesQuery: new FormControl(''),
    });

    this.searchNotesForm
      .get('searchNotesQuery')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((query) => {
        this._favoriteService
          .getNotes(this.selectedFavorite.id)
          .subscribe((notesArray) => {
            const searchedNotes = notesArray?.filter((note: any) => {
              const found = note.tags.filter((tag: any) => {
                if (tag.value.includes(query)) {
                  return note;
                }
              });

              if (found.length > 0) return found;
            });

            if (query.trim() == '') {
              this.selectedFavorite.notes = notesArray;
            } else {
              this.selectedFavorite.notes = searchedNotes;
            }
          });
      });
  }
}
