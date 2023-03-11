import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc, setDoc, addDoc, CollectionReference, DocumentData, docData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation: boolean = false;
  game!: Game;
  currentCard: string | any = '';
  game$: Observable<any>;
  gameCollection: CollectionReference<DocumentData>;
  gameID;
  gameDoc;

  constructor(
    public firestore: Firestore,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.gameCollection = collection(this.firestore, 'games');
    this.getGame()
  }

  async ngOnInit() {
    await this.newGame();
    await this.myRoute();

    // this.route.params.subscribe((param)=>{
    //   console.log('params[id]: ', param['id']);// logt die ID als STRING
    //   console.log('params: ',param); // logt die ID als JSON

    //   // Echtzeit-Updates  onSnapshot(argument 1, argument2 )
    //   // argument 1 (doc( datenbank, pfad des dokuments in der sammlung))
    //   // argument 2 function übergeben
    //   const unsub = onSnapshot(
    //     doc(this.firestore, `games/${param['id']}`), (game: any) => {
    //     console.log("Game update : ", game.data())
    //     }
    //     );
    // });
  }
  async myRoute() {
    await this.route.params.subscribe((para) => {
      const routId = para['id'];
      console.log('routeID: ', routId);// logt die ID als STRING
      console.log('routeID type: ', typeof routId);// logt die ID als STRING
      this.getOpenId(routId);
      this.gameID = routId;
      console.log('gameID2: ', routId);

      console.log('gameDoc: ', this.gameDoc);
      // this.game.currentPlayer = ourGame.currentPlayer;
      // this.game.playedCards = ourGame.playedCards;
      // this.game.players = ourGame.players;
      // this.game.stack = ourGame.stack; 
    })
  }

  returnMyRoute() {
    this.route.params.subscribe((para) => {
      return para['id'];
    });
  }


  getOpenId(para) {
    doc(this.firestore, `games/${para}`), (game: any) => {
      console.log("Game update : ", game.data())
      // ID übergeben
    }
  }

  getGame() {
    this.gameDoc = doc(this.gameCollection); // holt das Document von der aktuellen Sammlung
    this.gameID = this.gameDoc.id;  // holt die ID vom aktuellen Document aus der Sammmlung
    console.log('gameID: ', this.gameID);
  }

  async newGame() {
    this.game = new Game();
    // Erstellt ein neues Spiel in der Sammlung
    // let gameInfo = await addDoc(this.gameCollection, this.game.toJson());  //hinzufügen setDoc(param1, param2)
    // console.log('gameInfo: ',gameInfo);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      //remove last Card from Stack
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      // PlayerRotation
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      //show Card an the same Positon and remove the animated Card
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1250);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}

