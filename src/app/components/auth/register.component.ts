import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  role: string = 'sopran1'; // Výchozí hodnota

  onRegister() {
    console.log('Registrace uživatele:', this.email, this.username, this.role);
    // Sem přijde napojení na AuthService pro registraci
  }
}
