import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecrutementComponent } from './show.recrutement.component';

describe('ShowRecrutementComponent', () => {
  let component: ShowRecrutementComponent;
  let fixture: ComponentFixture<ShowRecrutementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRecrutementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
