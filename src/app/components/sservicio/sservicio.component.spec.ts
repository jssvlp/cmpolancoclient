import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SservicioComponent } from './sservicio.component';

describe('SservicioComponent', () => {
  let component: SservicioComponent;
  let fixture: ComponentFixture<SservicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SservicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
