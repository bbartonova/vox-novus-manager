import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;

  constructor(private authService: AuthService) {}

  async onResetPassword() {
    // Zkontrolujeme, zda je e-mail prázdný, ještě než voláme Firebase
    if (!this.email.trim()) {
      this.showAlertMessage('Zadejte prosím e-mailovou adresu.', 'error');
      return;
    }

    try {
      // Pokusíme se resetovat heslo a zachytit jakékoli chyby
      await this.authService.resetPassword(this.email);
      // Pokud vše proběhne v pořádku, informujeme uživatele
      this.showAlertMessage(
        'Informace byly odeslány na Vámi uvedený registrovaný e-mail.',
        'success'
      );
    } catch (error: any) {
      // V případě chyby od Firebase
      let errorMessage = 'Chyba při odesílání e-mailu.';

      // Specifické zpracování chybových kódů
      if (error?.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'E-mailová adresa je zadaná ve špatném formátu.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Pro zadaný e-mail nebyl nalezen žádný účet.';
            break;
          default:
            errorMessage = 'Nastala neočekávaná chyba. Zkuste to znovu.';
        }
      }

      console.error('Firebase error:', error);
      this.showAlertMessage(errorMessage, 'error');
    }
  }

  showAlertMessage(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    // Automatické zavření alertu po 5 sekundách
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  closeAlert() {
    this.showAlert = false;
  }
}
