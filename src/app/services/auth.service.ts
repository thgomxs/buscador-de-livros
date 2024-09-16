import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  login(username: string): void {
    if (username) {
      this._isAuthenticated = true;
      localStorage.setItem('username', username);
      this.router.navigate(['/']);
    }
  }

  getUsername(): any {
    if (this.isAuthenticated()) {
      return localStorage.getItem('username');
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('username');
  }

  logout(): void {
    this._isAuthenticated = false;
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
