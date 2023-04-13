import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnoughPlayerComponent } from './enough-player.component';

describe('EnoughPlayerComponent', () => {
  let component: EnoughPlayerComponent;
  let fixture: ComponentFixture<EnoughPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnoughPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnoughPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
