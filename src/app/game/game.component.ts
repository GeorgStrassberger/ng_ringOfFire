import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;

  constructor() { }

  ngOnInit(): void {
  }

  takeCard(){
    if (this.pickCardAnimation) {
      this.pickCardAnimation = false;
    }else{
    this.pickCardAnimation = true;
    }
  }

}
