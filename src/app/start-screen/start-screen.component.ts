import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/app/game/game.model';
import { GameService } from '../game/game.service';
import { Observable } from 'rxjs';
import { GameData } from '../game/game.interface';
import { JoinGameComponent } from '../cards/join-game/join-game.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    public gameService: GameService,
    private router: Router,
    private AngularFire: AngularFirestore
  ) {}

  ngOnInit(): void {}

  async startGame() {
    const newGameInstanc = new Game();
    // console.log('newGameInstanc: ', newGameInstanc);
    const gameJSON: GameData = newGameInstanc.toJSON();
    // console.log('gameJSON: ', gameJSON);
    const addGame = await this.gameService.addGame(gameJSON);
    // console.log('addGame.id', addGame.id);
    this.joinGame(addGame.id);
  }

  joinGame(id: string) {
    this.router.navigateByUrl('/game/' + id);
  }

  openDialog(): void {
    this.dialog.open(JoinGameComponent);
  }

  ngOnDestroy(): void {}
}
