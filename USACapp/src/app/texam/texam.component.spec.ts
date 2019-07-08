import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TExamComponent } from './texam.component';

describe('TExamComponent', () => {
  let component: TExamComponent;
  let fixture: ComponentFixture<TExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
