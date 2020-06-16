import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAccueilComponent } from './profil-accueil.component';

describe('ProfilAccueilComponent', () => {
  let component: ProfilAccueilComponent;
  let fixture: ComponentFixture<ProfilAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
