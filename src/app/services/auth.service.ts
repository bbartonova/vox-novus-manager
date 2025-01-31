import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // ✅ Přihlášení uživatele
  async login(email: string, password: string): Promise<string | null> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('Přihlášený uživatel:', userCredential.user);
      return null; // Žádná chyba, úspěch
    } catch (error: any) {
      console.error('Chyba při přihlášení:', error);
      return this.getFirebaseErrorMessage(error.code);
    }
  }

  // ✅ Obnovení hesla
  async resetPassword(email: string): Promise<string | null> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return null; // Úspěch, žádná chyba
    } catch (error: any) {
      console.error('Chyba při obnovení hesla:', error);
      return this.getFirebaseErrorMessage(error.code);
    }
  }

  // ✅ Odhlášení uživatele
  async logout(): Promise<string | null> {
    try {
      await this.afAuth.signOut();
      return null;
    } catch (error: any) {
      console.error('Chyba při odhlášení:', error);
      return this.getFirebaseErrorMessage(error.code);
    }
  }

  // ✅ Registrace uživatele a uložení do Firestore
  async register(
    email: string,
    password: string,
    username: string
  ): Promise<string | null> {
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
      return null;
    } catch (error: any) {
      console.error('Chyba při registraci:', error);
      return this.getFirebaseErrorMessage(error.code);
    }
  }

  // ✅ Převod Firebase error kódů na čitelné české zprávy
  private getFirebaseErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'E-mailová adresa je ve špatném formátu.';
      case 'auth/user-not-found':
        return 'Účet s tímto e-mailem neexistuje.';
      case 'auth/wrong-password':
        return 'Nesprávné heslo. Zkuste to znovu.';
      case 'auth/email-already-in-use':
        return 'Tento e-mail už je zaregistrovaný.';
      case 'auth/weak-password':
        return 'Heslo je příliš slabé. Použijte alespoň 6 znaků.';
      default:
        return 'Nastala neočekávaná chyba. Zkuste to znovu.';
    }
  }
}
