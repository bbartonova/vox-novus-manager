import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return afAuth.authState.pipe(
    take(1), // ✅ Ujistíme se, že vezmeme jen první hodnotu (aktuální stav přihlášení)
    map((user) => {
      console.log('authGuard - Přihlášený uživatel:', user); // ✅ Debugging
      if (user) {
        return true; // ✅ Pokud je uživatel přihlášen, pokračuje na dashboard
      } else {
        console.warn(
          'authGuard - Uživatel není přihlášen! Přesměrování na login.'
        );
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
