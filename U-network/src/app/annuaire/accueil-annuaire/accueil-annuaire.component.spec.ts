import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAnnuaireComponent } from './accueil-annuaire.component';

describe('AccueilAnnuaireComponent', () => {
  let component: AccueilAnnuaireComponent;
  let fixture: ComponentFixture<AccueilAnnuaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilAnnuaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilAnnuaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
