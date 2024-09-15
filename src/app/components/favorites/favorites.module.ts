import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StarRatingModule } from 'angular-star-rating';
import { FavoritesComponent } from './favorites.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    TagInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
      progressBar: true,
    }),
    StarRatingModule.forRoot(),
  ],
  declarations: [FavoritesComponent],
  exports: [FavoritesComponent],
})
export class FavoritesModule {}
