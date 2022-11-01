import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation: boolean = false;
  game: Game = {} as Game;
  currentCard: string | any = '';

  constructor() {

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

      console.log('New card: ', this.currentCard);
      console.log('Game is ',this.game);


      setTimeout(()=>{
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      },1250);
    }
  }






}
