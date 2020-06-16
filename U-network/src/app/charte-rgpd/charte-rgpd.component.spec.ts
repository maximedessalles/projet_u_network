import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharteRGPDComponent } from './charte-rgpd.component';

describe('CharteRGPDComponent', () => {
  let component: CharteRGPDComponent;
  let fixture: ComponentFixture<CharteRGPDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharteRGPDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharteRGPDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
