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
      console.log('paramsID', params['uid']);
      this.AngularFire
        .collection('games')
        .doc(params['uid'])
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
    if (!this.game.pickCardAnimation && this.game.stack.length >= 1) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;

      setTimeout(async () => {
        if (this.game.currentCard) {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
        }
      }, 1000);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(async (name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}