import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecrutementComponent } from './create.recrutement.component';

describe('CreateRecrutementComponent', () => {
  let component: CreateRecrutementComponent;
  let fixture: ComponentFixture<CreateRecrutementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecrutementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
