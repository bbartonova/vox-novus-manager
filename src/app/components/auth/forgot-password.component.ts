// forgot-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'success'; // Pro určení typu hlášky

  constructor(private authService: AuthService) {}

  async onResetPassword() {
    if (!this.email.trim()) {
      this.showMessage('Zadejte prosím e-mailovou adresu.', 'error');
      return;
    }

    try {
      await this.authService.resetPassword(this.email);
      this.showMessage(
        'Instrukce k obnově hesla byly odeslány na váš e-mail.',
        'success'
      );
    } catch (error: any) {
      this.showMessage(error.message, 'error'); // Chyba z našeho vlastního handleru
    }
  }

  // Funkce pro nastavení zprávy
  showMessage(text: string, type: 'success' | 'error') {
    this.message = text;
    this.messageType = type;
  }
}
