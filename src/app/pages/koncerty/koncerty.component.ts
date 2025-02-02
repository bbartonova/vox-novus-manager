import { Component, OnInit } from '@angular/core';
import { ConcertService } from '../../services/concert.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-koncerty',
  templateUrl: './koncerty.component.html',
  styleUrls: ['./koncerty.component.css'],
})
export class KoncertyComponent implements OnInit {
  isAdmin: boolean = false;
  showForm: boolean = false;
  concerts$: Observable<any[]>;
  newConcert = {
    nazev: '',
    datumCas: '',
    cyklus: '',
    misto: '',
    informace: '',
  };

  constructor(
    private concertService: ConcertService,
    private authService: AuthService
  ) {
    this.concerts$ = this.concertService.getConcerts();
  }

  ngOnInit(): void {
    this.authService
      .getCurrentUserRole()
      .then((role) => {
        // Pokud uživatel má roli "admin", je oprávněn přidávat koncerty
        this.isAdmin = role === 'admin';
      })
      .catch((err) => {
        console.error('Chyba při získávání role:', err);
      });
  }

  onAddConcert(): void {
    this.showForm = !this.showForm;
  }

  saveConcert(): void {
    if (!this.newConcert.nazev || !this.newConcert.datumCas) {
      alert('Vyplňte název a datum koncertu.');
      return;
    }
    this.concertService
      .addConcert(this.newConcert)
      .then(() => {
        alert('Koncert přidán!');
        // Reset formuláře
        this.newConcert = {
          nazev: '',
          datumCas: '',
          cyklus: '',
          misto: '',
          informace: '',
        };
        this.showForm = false;
      })
      .catch((err) => {
        console.error('Chyba při přidávání koncertu:', err);
        alert('Chyba při přidávání koncertu.');
      });
  }

  onConfirmParticipation(concertId: string): void {
    alert(`Potvrzení účasti na koncertě: ${concertId}`);
  }
}
