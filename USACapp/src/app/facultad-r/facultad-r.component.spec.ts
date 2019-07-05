import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadRComponent } from './facultad-r.component';

describe('FacultadRComponent', () => {
  let component: FacultadRComponent;
  let fixture: ComponentFixture<FacultadRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultadRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultadRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
