import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopEstTComponent } from './top-est-t.component';

describe('TopEstTComponent', () => {
  let component: TopEstTComponent;
  let fixture: ComponentFixture<TopEstTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopEstTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopEstTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
