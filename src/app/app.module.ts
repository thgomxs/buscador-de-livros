import { NgModule } from '@angular/core';

// Providers
import { provideHttpClient } from '@angular/common/http';

// Modules
import { FavoritesModule } from './components/favorites/favorites.module';
import { SharedModule } from './shared.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [FavoritesModule, SharedModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
