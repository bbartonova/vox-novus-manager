import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  async onResetPassword() {
    if (!this.email.trim()) {
      alert('Zadejte prosím e-mailovou adresu.');
      return;
    }

    try {
      await this.authService.resetPassword(this.email);
      alert('Instrukce k obnově hesla byly odeslány na váš e-mail.');
    } catch (error: any) {
      alert(error.message);
    }
  }
}
