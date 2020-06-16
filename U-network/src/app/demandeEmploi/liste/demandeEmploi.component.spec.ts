import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEmploiComponent } from './demandeEmploi.component';

describe('RecrutementComponent', () => {
  let component: DemandeEmploiComponent;
  let fixture: ComponentFixture<DemandeEmploiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeEmploiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
