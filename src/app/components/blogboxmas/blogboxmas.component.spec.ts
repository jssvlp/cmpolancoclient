import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogboxmasComponent } from './blogboxmas.component';

describe('BlogboxmasComponent', () => {
  let component: BlogboxmasComponent;
  let fixture: ComponentFixture<BlogboxmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogboxmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogboxmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
