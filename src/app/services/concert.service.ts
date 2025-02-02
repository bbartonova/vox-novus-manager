import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  private collectionName = 'concerts';

  constructor(private firestore: AngularFirestore) {}

  // Načítání koncertů seřazených podle data a času (předpokládáme, že v dokumentu je pole "datumCas")
  getConcerts(): Observable<any[]> {
    return this.firestore
      .collection(this.collectionName, (ref) => ref.orderBy('datumCas', 'asc'))
      .valueChanges({ idField: 'id' });
  }

  // Přidání nového koncertu
  addConcert(concert: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set(concert);
  }
}
