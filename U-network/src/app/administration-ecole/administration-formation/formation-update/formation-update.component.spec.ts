import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationUpdateComponent } from './formation-update.component';

describe('FiliereCreationComponent', () => {
  let component: FormationUpdateComponent;
  let fixture: ComponentFixture<FormationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
