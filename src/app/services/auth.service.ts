import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth'; // Import User typ

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // ✅ Přihlášení uživatele
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('Přihlášený uživatel:', userCredential.user);
      return userCredential.user; // Vrací uživatele
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při přihlášení:', error);
      throw new Error(errorMessage); // Vrátí chybu pro zpracování ve volající komponentě
    }
  }

  // ✅ Obnovení hesla
  async resetPassword(email: string): Promise<string> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return 'E-mail pro obnovení hesla byl odeslán.'; // Vrací textovou zprávu
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při obnovení hesla:', error);
      throw new Error(errorMessage); // Vrátí chybu pro zpracování ve volající komponentě
    }
  }

  // ✅ Odhlášení uživatele
  async logout(): Promise<string> {
    try {
      await this.afAuth.signOut();
      console.log('Uživatel odhlášen');
      return 'Byl jste úspěšně odhlášen.'; // Vrací textovou zprávu
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při odhlášení:', error);
      throw new Error(errorMessage); // Vrátí chybu pro zpracování ve volající komponentě
    }
  }

  // ✅ Registrace uživatele a uložení do Firestore
  async register(
    email: string,
    password: string,
    username: string
  ): Promise<string> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        await this.firestore
          .collection<DocumentData>('users')
          .doc(user.uid)
          .set({
            email: user.email,
            username: username,
            role: 'member',
            createdAt: new Date(),
          });
      } else {
        throw new Error('Uživatel nebyl vytvořen.');
      }
      return 'Registrace úspěšná!'; // Vrací textovou zprávu
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při registraci:', error);
      throw new Error(errorMessage); // Vrátí chybu pro zpracování ve volající komponentě
    }
  }

  // ✅ Ověření, zda je uživatel přihlášen
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.authState.subscribe((user) => {
        resolve(!!user); // Pokud existuje user, vrátí true, jinak false
      });
    });
  }
}
