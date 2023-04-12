import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';
import { GameData } from 'src/models/game-data';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentGame!: GameData;

  constructor(
    private AngularFire: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  getRouteId() {
    this.activeRoute.params.subscribe((params) => {
      return params['uid'];
    });
  }

  addNewGame() {
    const game = new Game();
    this.AngularFire.collection('games')
      .add(game.toJSON())
      .then((gameInfo: any) => {
        console.log('createdGame: ', gameInfo);
        game.uid = gameInfo.id;
        console.log(game);
        this.currentGame = game;
        console.log('currentGame', this.currentGame);
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }
}
