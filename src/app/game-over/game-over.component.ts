import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
})
export class GameOverComponent {
  constructor(private router: Router) {}

  closeGame() {
    this.router.navigateByUrl('');
  }
}
