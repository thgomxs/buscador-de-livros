import { NgModule } from '@angular/core';

// Providers
import { provideHttpClient } from '@angular/common/http';

// Modules
import { FavoritesModule } from './components/favorites/favorites.module';
import { SharedModule } from './shared.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [FavoritesModule, SharedModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
