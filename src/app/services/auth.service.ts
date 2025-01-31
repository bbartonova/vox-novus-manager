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
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // ✅ Obnovení hesla
  async resetPassword(email: string): Promise<void> {
    await this.afAuth.sendPasswordResetEmail(email);
  }

  // ✅ Odhlášení uživatele
  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  // ✅ Registrace uživatele a uložení do Firestore
  async register(
    email: string,
    password: string,
    username: string
  ): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      await this.firestore.collection<DocumentData>('users').doc(user.uid).set({
        email: user.email,
        username: username,
        role: 'member',
        createdAt: new Date(),
      });
    } else {
      throw new Error('Uživatel nebyl vytvořen.');
    }
  }
}
