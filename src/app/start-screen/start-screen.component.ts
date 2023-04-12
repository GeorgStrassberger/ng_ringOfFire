import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  constructor(
    // private router: Router,
    // private AngularFire: AngularFirestore,
    public gameService: GameService
  ) {}

  ngOnInit(): void {}

  // startGame() {
  //   const game = new Game();

  //   this.AngularFire.collection('games')
  //     .add(game.toJSON())
  //     .then((gameInfo: any) => {
  //       console.log('createdGame: ', gameInfo);
  //       game.uid = gameInfo.id;
  //       console.log(game);
  //       // this.router.navigateByUrl('/game/' + gameInfo.id);
  //     });
  // }
}
