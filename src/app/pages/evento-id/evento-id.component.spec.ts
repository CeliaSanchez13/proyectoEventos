import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoIdComponent } from './evento-id.component';

describe('EventoIdComponent', () => {
  let component: EventoIdComponent;
  let fixture: ComponentFixture<EventoIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventoIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventoIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
