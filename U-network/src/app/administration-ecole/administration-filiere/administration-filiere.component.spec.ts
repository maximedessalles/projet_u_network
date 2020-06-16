import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationFiliereComponent } from './administration-filiere.component';

describe('AdministrationEcoleComponent', () => {
  let component: AdministrationFiliereComponent;
  let fixture: ComponentFixture<AdministrationFiliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationFiliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
