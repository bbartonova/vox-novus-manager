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
    } catch (error: any) {
      console.error('Chyba při přihlášení:', error);
      throw error; // ❌ NEvoláme alert(), ale vrátíme chybu do komponenty
    }
  }

  // ✅ Obnovení hesla (bez alertu!)
  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error: any) {
      console.error('Chyba při obnovení hesla:', error);
      throw error; // ❌ Vracíme chybu do komponenty, aby ji zobrazila po svém
    }
  }

  // ✅ Odhlášení uživatele
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Uživatel odhlášen');
    } catch (error: any) {
      console.error('Chyba při odhlášení:', error);
      throw error;
    }
  }

  // ✅ Registrace uživatele + uložení do Firestore (bez alertu)
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
    } catch (error: any) {
      console.error('Chyba při registraci:', error);
      throw error;
    }
  }
}
