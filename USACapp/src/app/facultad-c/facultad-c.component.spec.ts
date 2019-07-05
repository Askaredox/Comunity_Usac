import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadCComponent } from './facultad-c.component';

describe('FacultadCComponent', () => {
  let component: FacultadCComponent;
  let fixture: ComponentFixture<FacultadCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultadCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultadCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
