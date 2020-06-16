import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationEcoleComponent } from './administration-ecole.component';

describe('AdministrationEcoleComponent', () => {
  let component: AdministrationEcoleComponent;
  let fixture: ComponentFixture<AdministrationEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
