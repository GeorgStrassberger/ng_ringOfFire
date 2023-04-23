import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'src/app/game/game.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../cards/dialog-add-player/dialog-add-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GameData } from 'src/app/game/game.interface';
import { EditPlayerComponent } from '../cards/edit-player/edit-player.component';
import { GameService } from './game.service';
import { EnoughPlayerComponent } from '../cards/enough-player/enough-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss', './game.media.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  gameOver: boolean = false;
  game: GameData = new Game();
  currentGameID: string;
  currentGame$;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params): void => {
      this.currentGameID = params['uid'];
    });

    this.currentGame$ = this.gameService.getGame(this.currentGameID);

    this.currentGame$.subscribe((gameData: GameData) => {
      this.game.currentCard = gameData.currentCard;
      this.game.player_images = gameData.player_images;
      this.game.currentPlayer = gameData.currentPlayer;
      this.game.pickCardAnimation = gameData.pickCardAnimation;
      this.game.playedCards = gameData.playedCards;
      this.game.players = gameData.players;
      this.game.stack = gameData.stack;
      this.game.id = this.currentGameID;
    });
  }

  enoughPlayers(): boolean {
    return this.game.players.length >= 1;
  }

  takeCard(): void {
    if (this.enoughPlayers()) {
      if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;
        console.log('this.game.stack.length', this.game.stack.length);
        this.updateGame(this.game);

        setTimeout((): void => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.updateGame(this.game);
        }, 1000);
      } else if (this.game.stack.length == 0) {
        console.log('Keine Karten mehr');
        this.gameOver = true;
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
        this.updateGame(this.game);
      }
    });
  }

  addPlayer(name: string): void {
    this.game.players.push(name);
    this.game.player_images.push('male.webp');
    this.updateGame(this.game);
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

  updateGame(gameData) {
    this.gameService.updateGame(gameData);
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

  ngOnDestroy(): void {}
}
