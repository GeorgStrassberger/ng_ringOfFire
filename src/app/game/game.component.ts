import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { GameData } from 'src/models/game-data';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameOver: boolean = false;
  game: Game;
  gameId: string;

  constructor(
    public dialog: MatDialog,
    private AngularFire: AngularFirestore,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.newGame();

    this.route.params.subscribe((params) => {

      this.gameId = params['uid'];

      this.AngularFire
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: GameData): void => {
          this.game.currentCard = game.currentCard;
          this.game.player_images = game.player_images;
          this.game.currentPlayer = game.currentPlayer;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
        });
    });
  }

  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (this.game.stack.length === 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.updateGame(); // saveGame

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame(); // saveGame
      }, 1000);
    }
  }


  editPlayer(playerID: number) {
    console.log('EditPlayer', playerID);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerID, 1);
          this.game.player_images.splice(playerID, 1);
        } else {
          this.game.player_images[playerID] = change;
        }
        this.updateGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('male.webp');
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