import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemandeEmploiComponent } from './create.demandeEmploi.component';

describe('CreateDemandeEmploiComponent', () => {
  let component: CreateDemandeEmploiComponent;
  let fixture: ComponentFixture<CreateDemandeEmploiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDemandeEmploiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDemandeEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
