import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolRComponent } from './rol-r.component';

describe('RolRComponent', () => {
  let component: RolRComponent;
  let fixture: ComponentFixture<RolRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
