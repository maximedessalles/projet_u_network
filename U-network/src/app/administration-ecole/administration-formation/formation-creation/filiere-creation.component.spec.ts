import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereCreationComponent } from './formation-creation.component';

describe('FiliereCreationComponent', () => {
  let component: FiliereCreationComponent;
  let fixture: ComponentFixture<FiliereCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliereCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliereCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
