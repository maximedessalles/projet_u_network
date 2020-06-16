import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandeEmploiComponent } from './show.demandeEmploi.component';

describe('ShowRecrutementComponent', () => {
  let component: ShowDemandeEmploiComponent;
  let fixture: ComponentFixture<ShowDemandeEmploiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemandeEmploiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandeEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
