import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
// Materiel Design 
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog'; 
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input'; 
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { GameInfoComponent } from './game-info/game-info.component';
//Firebase
import { initializeApp,provideFirebaseApp, getApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore'; 


@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInfoComponent
  ],
  imports: [    
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
