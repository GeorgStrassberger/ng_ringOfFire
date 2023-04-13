import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/game/game.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../cards/dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { GameData } from 'src/app/game/game.interface';
import { EditPlayerComponent } from '../cards/edit-player/edit-player.component';
import { GameService } from './game.service';
import { EnoughPlayerComponent } from '../cards/enough-player/enough-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameOver: boolean = false;
  game: Game;
  currentGameID: string;

  constructor(
    public dialog: MatDialog,
    private AngularFire: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params): void => {
      this.currentGameID = params['uid'];

      this.AngularFire.collection('games')
        .doc(this.currentGameID)
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

  newGame(): void {
    this.game = new Game();
  }

  enoughPlayers(): boolean {
    return this.game.players.length >= 1;
  }

  takeCard(): void {
    if (this.enoughPlayers()) {
      if (this.game.stack.length === 0) {
        this.gameOver = true;
        console.log('Keine Karten mehr');
      } else if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;

        this.updateGame();

        setTimeout((): void => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.updateGame();
        }, 1000);
      }
    } else {
      this.openDialog();
    }
  }

  editPlayer(playerID: number): void {
    console.log('EditPlayer', playerID);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string): void => {
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

  addPlayer(name: string): void {
    this.game.players.push(name);
    this.game.player_images.push('male.webp');
    this.updateGame();
  }

  openDialog(): void {
    if (this.game.players.length >= 8) {
      this.dialog.open(EnoughPlayerComponent);
    } else {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      dialogRef.afterClosed().subscribe((name: string): void => {
        if (name) {
          if (name.length > 0 && name.length < 20) {
          }
          this.addPlayer(name);
        }
      });
    }
  }

  updateGame(): void {
    this.AngularFire.collection('games')
      .doc(this.currentGameID)
      .update(this.game.toJSON());
  }

  closeGame(): void {
    // for login logic - delete game if last player is leave
    if (this.game.players.length <= 1) {
      this.gameService.deleteGame(this.currentGameID);
      this.router.navigateByUrl('');
    } else {
      // message to remember game is still open
      this.router.navigateByUrl('');
    }
  }
}
