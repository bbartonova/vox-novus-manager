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

    const errorMessage = await this.authService.resetPassword(this.email);

    if (errorMessage) {
      this.showAlertMessage(errorMessage, 'error'); // Zobrazení chyby
    } else {
      this.showAlertMessage(
        'Instrukce k obnově hesla byly odeslány na váš e-mail.',
        'success'
      );
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
