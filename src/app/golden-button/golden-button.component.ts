import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-golden-button',
  template: '<button class="golden-btn">{{ valueMessage }}</button>',
  styleUrls: ['./golden-button.component.scss'],
})
export class GoldenButtonComponent {
  @Input() valueMessage: string = '';
}
