import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolCComponent } from './rol-c.component';

describe('RolCComponent', () => {
  let component: RolCComponent;
  let fixture: ComponentFixture<RolCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
