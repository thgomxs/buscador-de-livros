import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';

  constructor(private _authService: AuthService, private router: Router) {
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  login(): void {
    this._authService.login(this.username);
  }
}
