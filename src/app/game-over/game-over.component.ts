import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
})
export class GameOverComponent {
  currentGameID: string;

  constructor(
    private router: Router,
    public gameService: GameService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params): void => {
      this.currentGameID = params['uid'];
    });
  }

  closeGame() {
    console.log('GameID:', this.currentGameID);
    this.router.navigateByUrl('');
    this.gameService.deleteGame(this.currentGameID);
  }
}
