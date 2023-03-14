import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { GameData } from 'src/models/game-data';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game: Game;
  gameId: string;

  constructor(
    public dialog: MatDialog,
    private AngularFire: AngularFirestore,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.newGame();

    this.route.params.subscribe(async (params) => {
      console.log('params', params);

      this.gameId = params['uid'];
      this.AngularFire
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: GameData): void => {
          console.log('Game update', game);
          this.game.currentCard;
          this.game.currentPlayer;
          this.game.pickCardAnimation;
          this.game.playedCards;
          this.game.players;
          this.game.stack;
        });


      // const allGameRef = collection(this.firestore, 'games');
      // this.gameCollections$ = collectionData(allGameRef);
      // this.gameCollections$.subscribe((game) => {
      //   console.log('all Games', game);
      // });
      // const docRef = doc(collection(this.firestore, 'games'), params['id']);
      // this.gameInfo$ = docData(docRef);
      // this.gameInfo$.subscribe((game) => {
      //   this.game.currentPlayer = game.currentPlayer;
      //   this.game.playedCards = game.playedCards;
      //   this.game.players = game.players;
      //   this.game.stack = game.stack;
      //   this.game.currentCard = game.currentCard;
      //   this.game.pickCardAnimation = game.pickCardAnimation;
      // });
    });
  }

  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log('New card: ', this.currentCard);
      console.log('Game is: ', this.game);
      this.updateGame(); // saveGame

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1250);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }
  // saveGame
  updateGame() {
    this.AngularFire
      .collection('games') // die Sammlung
      .doc(this.gameId)   // das Document
      .update(this.game.toJSON()); // das Object
  }
}