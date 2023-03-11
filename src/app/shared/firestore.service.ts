import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  gameCollection: CollectionReference<DocumentData>;

  constructor(public firestore: Firestore) {
    this.gameCollection = collection(this.firestore, 'game');
  }

  getAll(): Observable<Game[]> {
    return collectionData(this.gameCollection, {
      idField: 'id',
    }) as Observable<Game[]>;
  }

  get(id: string) {
    const gameDocumentReference = doc(this.firestore, `game/${id}`);
    return docData(gameDocumentReference, { idField: 'id' });
  }

  create(game: Game) {
    return addDoc(this.gameCollection, game.toJson());
  }

  update(game: Game) {
    const gameDocumentReference = doc(this.firestore, `game/${game}`);
    return updateDoc(gameDocumentReference, { ...game });
  }

  delete(id: string) {
    const gameDocumentReference = doc(this.firestore, `game/${id}`);
    return deleteDoc(gameDocumentReference);
  }


}
