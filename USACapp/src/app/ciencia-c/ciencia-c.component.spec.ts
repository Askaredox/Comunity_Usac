import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CienciaCComponent } from './ciencia-c.component';

describe('CienciaCComponent', () => {
  let component: CienciaCComponent;
  let fixture: ComponentFixture<CienciaCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CienciaCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CienciaCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
