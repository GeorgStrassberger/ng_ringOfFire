import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GameData } from '../../game/game.interface';
import { GameService } from '../../game/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent {
  allGames$: Observable<GameData[]>;

  selectedGameId: string = '';

  constructor(
    public dialogRef: MatDialogRef<JoinGameComponent>,
    public gameService: GameService,
    private router: Router
  ) {
    this.allGames$ = this.gameService.getAllGames();
  }

  ngOnInit(): void {
    console.log('allGames$', this.allGames$);
    this.allGames$.subscribe((allGames) => {
      console.log('allGames$.subcribe: ', allGames);
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  selectGame(id: string) {
    this.selectedGameId = id;
  }

  joinGame() {
    this.router.navigateByUrl('/game/' + this.selectedGameId);
  }
}
