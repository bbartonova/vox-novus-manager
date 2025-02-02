import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Přihlášení uživatele
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('Přihlášený uživatel:', userCredential.user);
      return userCredential.user;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při přihlášení:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  // Obnovení hesla
  async resetPassword(email: string): Promise<string> {
    try {
      // Nejdříve zjistíme, zda je e-mail registrován
      const signInMethods = await this.afAuth.fetchSignInMethodsForEmail(email);
      if (signInMethods.length === 0) {
        throw new Error('auth/user-not-found');
      }
      await this.afAuth.sendPasswordResetEmail(email);
      return 'Instrukce k obnově hesla byly odeslány na váš e-mail.';
    } catch (error: any) {
      console.error('Chyba při obnově hesla:', error);
      return this.getErrorMessage(error.code);
    }
  }

  // Odhlášení uživatele
  async logout(): Promise<string> {
    try {
      await this.afAuth.signOut();
      console.log('Uživatel odhlášen');
      return 'Byl jste úspěšně odhlášen.';
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při odhlášení:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  // Registrace uživatele a uložení do Firestore
  async register(
    email: string,
    password: string,
    username: string,
    role: string
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
            role: role, // Uložíme zvolenou roli
            createdAt: new Date(),
          });
      } else {
        throw new Error('Uživatel nebyl vytvořen.');
      }
      return 'Registrace úspěšná!';
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při registraci:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  // Ověření, zda je uživatel přihlášen
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.authState.subscribe((user) => {
        resolve(!!user);
      });
    });
  }

  // Získání role aktuálně přihlášeného uživatele
  async getCurrentUserRole(): Promise<string> {
    const user = await firstValueFrom(this.afAuth.authState);
    if (user) {
      const docSnapshot = await firstValueFrom(
        this.firestore.collection('users').doc(user.uid).get()
      );
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        return data && data['role'] ? data['role'] : '';
      }
    }
    return '';
  }

  // Převod Firebase chybových kódů na české zprávy
  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Tento e-mail je již registrován.',
      'auth/invalid-email': 'Neplatná e-mailová adresa.',
      'auth/weak-password': 'Heslo musí obsahovat alespoň 6 znaků.',
      'auth/missing-email': 'E-mailová adresa je povinná.',
      'auth/user-not-found': 'Tento e-mail není spojen s žádným účtem.',
      'auth/internal-error': 'Vyskytla se interní chyba serveru.',
      'auth/network-request-failed': 'Problém s připojením k internetu.',
      'auth/too-many-requests': 'Příliš mnoho pokusů. Zkuste to později.',
      'auth/operation-not-allowed': 'Tato operace není povolena.',
    };

    return (
      errorMessages[errorCode] || 'Nastala neočekávaná chyba. Zkuste to znovu.'
    );
  }
}
