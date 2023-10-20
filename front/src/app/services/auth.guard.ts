import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = AuthService.getToken("token");
    if (token) {
      // L'utente è autenticato (ha un token valido)
      return true;
    } else {
      // L'utente non è autenticato, quindi reindirizzalo alla pagina di accesso
      this.router.navigate(['/login']);
      return false;
    }
  }
}

