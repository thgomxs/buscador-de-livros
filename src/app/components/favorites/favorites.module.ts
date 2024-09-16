import { NgModule } from '@angular/core';

// Modules
import { StarRatingModule } from 'angular-star-rating';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../../shared.module';

// Components
import { FavoritesComponent } from './favorites.component';

@NgModule({
  imports: [
    SharedModule,
    TagInputModule,
    BrowserAnimationsModule,
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
