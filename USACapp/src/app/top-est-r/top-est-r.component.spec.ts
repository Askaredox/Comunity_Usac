import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopEstRComponent } from './top-est-r.component';

describe('TopEstRComponent', () => {
  let component: TopEstRComponent;
  let fixture: ComponentFixture<TopEstRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopEstRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopEstRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
