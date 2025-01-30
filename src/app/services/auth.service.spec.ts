import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Přihlášení uživatele
  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Přihlášený uživatel:', userCredential.user);
        alert('Přihlášení úspěšné!');
      })
      .catch((error) => {
        console.error('Chyba při přihlášení:', error);
        alert('Chyba: ' + error.message);
      });
  }

  // Obnovení hesla
  resetPassword(email: string) {
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('E-mail pro obnovení hesla byl odeslán.');
      })
      .catch((error) => {
        console.error('Chyba při obnovení hesla:', error);
        alert('Chyba: ' + error.message);
      });
  }

  // Odhlášení uživatele
  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        console.log('Uživatel odhlášen');
        alert('Byl jste úspěšně odhlášen.');
      })
      .catch((error) => {
        console.error('Chyba při odhlášení:', error);
      });
  }
}
