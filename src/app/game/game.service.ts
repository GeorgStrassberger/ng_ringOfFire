import { Injectable } from '@angular/core';
// Game Model / Interface
import { Game } from 'src/app/game/game';
// Firestore API's
import {
  collection,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';
import {
  Firestore,
  collectionData,
  docData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc, // in den anderen import
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameData } from './igame.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.gameCollection = collection(this.firestore, 'games');
  }

  getAllGames() {
    return collectionData(this.gameCollection, {
      idField: 'id',
    }) as Observable<GameData[]>;
  }

  getGame(id: string) {
    const gameDocumentReference = doc(this.firestore, `games/${id}`);
    return docData(gameDocumentReference, { idField: 'id' });
  }

  //Add a new Game
  addGame(game: GameData) {
    game.id = doc(collection(this.firestore, 'id')).id;
    return addDoc(collection(this.firestore, 'games'), game);
  }

  createGame(game: GameData) {
    return addDoc(this.gameCollection, game);
  }

  updateGame(game: Game) {
    const gameDocumentReference = doc(this.firestore, `games/${game.id}`);
    return updateDoc(gameDocumentReference, { ...game });
  }

  deleteGame(id: string) {
    const gameDocumentReference = doc(this.firestore, `games/${id}`);
    return deleteDoc(gameDocumentReference);
  }
}
