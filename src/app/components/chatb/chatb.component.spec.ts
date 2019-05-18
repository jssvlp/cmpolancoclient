import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbComponent } from './chatb.component';

describe('ChatbComponent', () => {
  let component: ChatbComponent;
  let fixture: ComponentFixture<ChatbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
