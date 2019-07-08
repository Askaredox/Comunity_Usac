import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StExamComponent } from './st-exam.component';

describe('StExamComponent', () => {
  let component: StExamComponent;
  let fixture: ComponentFixture<StExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
