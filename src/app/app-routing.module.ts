import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';


const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game/:uid', component: GameComponent }, //route verfügt über den : eine variable namens id
  { path: '**', component: StartScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
