import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module'; // Importar o módulo de rotas

// Componentes e serviços
import { AppComponent } from './app.component';
import { Title } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FavoritesModule } from './components/favorites/favorites.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    FavoritesModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(), Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
