import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importujte Router
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private authService: AuthService, private router: Router) {} // Vstřikujeme Router

  async onLogin() {
    if (!this.email.trim() || !this.password.trim()) {
      this.showMessage('Vyplňte e-mail i heslo.', 'error');
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
      this.showMessage('Přihlášení úspěšné.', 'success');

      // Po úspěšném přihlášení přesměrujeme uživatele na dashboard
      this.router.navigate(['/dashboard']); // Přesměrování na dashboard
    } catch (error: any) {
      let errorMessage = 'Chyba při přihlášení. Zkontrolujte své údaje.';

      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Nesprávné heslo.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Účet s tímto e-mailem neexistuje.';
      }

      this.showMessage(errorMessage, 'error');
    }
  }

  showMessage(text: string, type: 'success' | 'error') {
    this.message = text;
    this.messageType = type;
  }
}
