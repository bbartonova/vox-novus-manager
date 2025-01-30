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
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('Přihlášený uživatel:', userCredential.user);
      alert('Přihlášení úspěšné!');
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při přihlášení:', error);
      alert('Chyba: ' + errorMessage);
    }
  }

  // ✅ Obnovení hesla
  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      alert('E-mail pro obnovení hesla byl odeslán.');
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při obnovení hesla:', error);
      alert('Chyba: ' + errorMessage);
    }
  }

  // ✅ Odhlášení uživatele
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Uživatel odhlášen');
      alert('Byl jste úspěšně odhlášen.');
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při odhlášení:', error);
      alert('Chyba: ' + errorMessage);
    }
  }

  // ✅ Registrace uživatele a uložení do Firestore
  async register(
    email: string,
    password: string,
    username: string
  ): Promise<void> {
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
      alert('Registrace úspěšná!');
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error('Chyba při registraci:', error);
      alert('Chyba: ' + errorMessage);
    }
  }
}
