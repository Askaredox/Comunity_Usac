import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraRComponent } from './carrera-r.component';

describe('CarreraRComponent', () => {
  let component: CarreraRComponent;
  let fixture: ComponentFixture<CarreraRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarreraRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarreraRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
