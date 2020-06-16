import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationFormationComponent } from './administration-formation.component';

describe('AdministrationEcoleComponent', () => {
  let component: AdministrationFormationComponent;
  let fixture: ComponentFixture<AdministrationFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
