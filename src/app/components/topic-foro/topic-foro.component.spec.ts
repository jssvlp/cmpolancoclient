import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicForoComponent } from './topic-foro.component';

describe('TopicForoComponent', () => {
  let component: TopicForoComponent;
  let fixture: ComponentFixture<TopicForoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicForoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
