import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

import { initializeApp } from 'firebase/app';

// Firebase konfigurace (tu máš už připravenou)
const firebaseConfig = {
  apiKey: 'AIzaSyAwhPZbESexOSlH95ttTFKvRFF6tmpu_D4',
  authDomain: 'vox-novus-manager.firebaseapp.com',
  projectId: 'vox-novus-manager',
  storageBucket: 'vox-novus-manager.appspot.com',
  messagingSenderId: '1021640825998',
  appId: '1:1021640825998:web:b27593565a013e88963ddf',
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);

//zachytit globální chyby a zablokovat je
window.addEventListener('error', function (event) {
  if (event.message.includes('Firebase')) {
    event.preventDefault();
  }
});
