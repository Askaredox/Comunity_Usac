import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCComponent } from './user-c.component';

describe('UserCComponent', () => {
  let component: UserCComponent;
  let fixture: ComponentFixture<UserCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
