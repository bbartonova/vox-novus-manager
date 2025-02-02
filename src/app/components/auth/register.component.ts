import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  role: string = 'sopran1'; // Výchozí role

  message: string = '';
  messageType: string = '';

  constructor(private authService: AuthService) {}

  async onRegister() {
    console.log('Registrace uživatele:', this.email, this.username, this.role);

    try {
      await this.authService.register(
        this.email,
        this.password,
        this.username,
        this.role
      );
      this.showMessage('Registrace proběhla úspěšně!', 'success');
    } catch (error: any) {
      console.error('🔥 Firebase chyba při registraci:', error);

      // Pokud Firebase vrátí chybu, získáme její kód
      const errorCode = error?.code || 'unknown-error';
      console.log('📌 Detekovaný chybový kód:', errorCode);

      // 🔥 Přeložíme chybu do češtiny
      const errorMessage = this.mapFirebaseError(errorCode);
      console.log('📢 Finální chyba pro uživatele:', errorMessage);

      this.showMessage(errorMessage, 'error');
    }
  }

  /**
   * 🔄 Mapování Firebase chybových kódů na české hlášky.
   */
  private mapFirebaseError(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Tento e-mail je již registrován.',
      'auth/invalid-email': 'Neplatná e-mailová adresa.',
      'auth/weak-password': 'Heslo musí obsahovat alespoň 6 znaků.',
      'auth/missing-email': 'E-mailová adresa je povinná.',
      'auth/internal-error': 'Vyskytla se interní chyba serveru.',
      'auth/network-request-failed': 'Problém s připojením k internetu.',
      'auth/too-many-requests': 'Příliš mnoho pokusů. Zkuste to později.',
      'auth/operation-not-allowed': 'Tato operace není povolena.',
    };

    return (
      errorMessages[errorCode] || 'Nastala neočekávaná chyba. Zkuste to znovu.'
    );
  }

  showMessage(text: string, type: 'success' | 'error') {
    this.message = text;
    this.messageType = type;
  }
}
