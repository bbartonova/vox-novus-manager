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
    if (!this.email.trim()) {
      this.showAlertMessage('Zadejte prosím e-mailovou adresu.', 'error');
      return;
    }

    try {
      await this.authService.resetPassword(this.email);
      this.showAlertMessage(
        'Informace byly odeslány na Vámi uvedený registrovaný e-mail.',
        'success'
      );
    } catch (error: any) {
      let errorMessage = 'Chyba při odesílání e-mailu.';

      // Zpracování chyb podle Firebase kódu
      if (error?.code) {
        const errorMessages: Record<string, string> = {
          'auth/invalid-email': 'E-mailová adresa není ve správném formátu.',
          'auth/user-not-found': 'Pro zadaný e-mail nebyl nalezen žádný účet.',
          'auth/network-request-failed':
            'Připojení k serveru selhalo. Zkontrolujte internet.',
          'auth/too-many-requests': 'Příliš mnoho pokusů. Zkuste to později.',
        };

        errorMessage =
          errorMessages[error.code] ||
          'Nastala neočekávaná chyba. Zkuste to znovu.';
      }

      console.error('Firebase error:', error);

      // Potlačení alertu v prohlížeči
      if (error && error.message) {
        error.preventDefault?.(); // Zabráníme výchozímu chování
      }

      this.showAlertMessage(errorMessage, 'error');
    }
  }

  showAlertMessage(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  closeAlert() {
    this.showAlert = false;
  }
}
