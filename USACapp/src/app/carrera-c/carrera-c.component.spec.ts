import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraCComponent } from './carrera-c.component';

describe('CarreraCComponent', () => {
  let component: CarreraCComponent;
  let fixture: ComponentFixture<CarreraCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarreraCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarreraCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
