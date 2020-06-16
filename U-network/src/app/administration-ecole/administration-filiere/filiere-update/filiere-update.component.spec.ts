import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereUpdateComponent } from './filiere-update.component';

describe('FormationUpdateComponent', () => {
  let component: FiliereUpdateComponent;
  let fixture: ComponentFixture<FiliereUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliereUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliereUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


