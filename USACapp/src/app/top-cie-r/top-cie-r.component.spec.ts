import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCieRComponent } from './top-cie-r.component';

describe('TopCieRComponent', () => {
  let component: TopCieRComponent;
  let fixture: ComponentFixture<TopCieRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCieRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCieRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
