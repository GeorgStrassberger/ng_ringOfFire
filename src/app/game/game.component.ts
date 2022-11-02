import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation: boolean = false;
  game: Game = {} as Game;
  currentCard: string | any = '';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game();
    console.log(this.game);
  }

  takeCard(){
    if (!this.pickCardAnimation) {
      //remove last Card from Stack
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      // PlayerRotation
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      //0 = 0 / 3 = 0;
      //1 = 1 / 3 = 1;
      //2 = 2 / 3 = 2;
      //3 = 3 / 3 = 0;
      //4 = 4 / 3 = 1;

      //show Card an the same Positon and remove the animated Card
      setTimeout(()=>{
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      },1250);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      this.game.players.push(name);
      console.log('The dialog was closed', name);
    });
  }



}

