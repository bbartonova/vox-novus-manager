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
      console.error('Chyba při přihlášení:', errorMessage);
      throw new Error(errorMessage); // Vrátí chybu pro zpracování ve volající komponentě
    }
  }

  // ✅ Obnovení hesla
  async resetPassword(email: string): Promise<string> {
    try {
      console.log('Kontrola e-mailu:', email); // Přidejme log pro kontrolu e-mailu
      // Kontrola, jestli je e-mail spojen s nějakým účtem
      const signInMethods = await this.afAuth.fetchSignInMethodsForEmail(email);
      console.log('Možnosti přihlášení pro e-mail:', signInMethods); // Zobrazíme možnosti přihlášení

      // Pokud seznam metod přihlášení pro daný e-mail je prázdný, e-mail není registrován
      if (signInMethods.length === 0) {
        console.log('E-mail není registrován.');
        throw new Error('user-not-found'); // Předáme kód chyby
      }

      // Pokud je e-mail registrován, pokračujeme s odesláním resetovacího e-mailu
      await this.afAuth.sendPasswordResetEmail(email);
      return 'Instrukce k obnově hesla byly odeslány na váš e-mail.';
    } catch (error: any) {
      console.error('Chyba při obnově hesla:', error); // Detailní logování chyby
      // Chytáme běžné chyby Firebase a překládáme je do češtiny
      const errorMessage = this.getErrorMessage(error.code);
      console.error('Přeložená chyba:', errorMessage);
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
      console.error('Chyba při odhlášení:', errorMessage);
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
      console.error('Chyba při registraci:', errorMessage);
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

  // Přidání metody pro mapování kódů Firebase chyb do češtiny
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Neplatný formát e-mailové adresy.';
      case 'auth/user-not-found':
        return 'Tento e-mail není spojen s žádným účtem.';
      case 'auth/missing-email':
        return 'E-mailová adresa je povinná.';
      default:
        return 'Nastala neznámá chyba.';
    }
  }
}
