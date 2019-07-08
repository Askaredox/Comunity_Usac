import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCatTComponent } from './top-cat-t.component';

describe('TopCatTComponent', () => {
  let component: TopCatTComponent;
  let fixture: ComponentFixture<TopCatTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCatTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCatTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
