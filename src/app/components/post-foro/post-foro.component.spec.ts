import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostForoComponent } from './post-foro.component';

describe('PostForoComponent', () => {
  let component: PostForoComponent;
  let fixture: ComponentFixture<PostForoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostForoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
