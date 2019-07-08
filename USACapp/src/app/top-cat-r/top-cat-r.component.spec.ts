import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCatRComponent } from './top-cat-r.component';

describe('TopCatRComponent', () => {
  let component: TopCatRComponent;
  let fixture: ComponentFixture<TopCatRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCatRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCatRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
