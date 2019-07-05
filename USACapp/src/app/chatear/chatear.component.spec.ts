import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatearComponent } from './chatear.component';

describe('ChatearComponent', () => {
  let component: ChatearComponent;
  let fixture: ComponentFixture<ChatearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
