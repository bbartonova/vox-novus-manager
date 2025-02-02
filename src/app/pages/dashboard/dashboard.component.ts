import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  menuOpen = false; // Stav pro zobrazení menu na mobilu

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onLogout() {
    // Zavoláme logout metodu v AuthService
    this.authService.logout().then(() => {
      // Po úspěšném odhlášení přesměrujeme uživatele na stránku přihlášení
      this.router.navigate(['/login']);
    });
  }
}
