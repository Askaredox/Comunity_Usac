import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CienciaRComponent } from './ciencia-r.component';

describe('CienciaRComponent', () => {
  let component: CienciaRComponent;
  let fixture: ComponentFixture<CienciaRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CienciaRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CienciaRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
