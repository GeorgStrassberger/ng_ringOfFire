import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enough-player',
  templateUrl: './enough-player.component.html',
  styleUrls: ['./enough-player.component.scss'],
})
export class EnoughPlayerComponent {
  constructor(public dialogRef: MatDialogRef<EnoughPlayerComponent>) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
