import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRComponent } from './user-r.component';

describe('UserRComponent', () => {
  let component: UserRComponent;
  let fixture: ComponentFixture<UserRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
