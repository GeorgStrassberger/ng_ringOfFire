import { GameData } from './game.interface';

export class Game implements GameData {
  public players: string[] = [];
  public player_images: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public pickCardAnimation = false;
  public currentCard: string = '';
  public id: string = '';

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('spade_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
    }
    this.shuffle(this.stack);
  }

  public toJSON() {
    return {
      players: this.players,
      player_images: this.player_images,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard,
      id: this.id,
    };
  }

  public shuffle(array: string[]): string[] {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
}

//Funktion wandelt unser Game Object in ein JSON um
