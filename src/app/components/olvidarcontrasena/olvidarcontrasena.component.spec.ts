import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidarcontrasenaComponent } from './olvidarcontrasena.component';

describe('OlvidarcontrasenaComponent', () => {
  let component: OlvidarcontrasenaComponent;
  let fixture: ComponentFixture<OlvidarcontrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidarcontrasenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidarcontrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
