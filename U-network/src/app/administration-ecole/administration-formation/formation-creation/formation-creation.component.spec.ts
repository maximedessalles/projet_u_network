import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationCreationComponent } from './formation-creation.component';

describe('FormationCreationComponent', () => {
  let component: FormationCreationComponent;
  let fixture: ComponentFixture<FormationCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
