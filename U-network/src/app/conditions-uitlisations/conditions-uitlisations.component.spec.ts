import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsUitlisationsComponent } from './conditions-uitlisations.component';

describe('ConditionsUitlisationsComponent', () => {
  let component: ConditionsUitlisationsComponent;
  let fixture: ComponentFixture<ConditionsUitlisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsUitlisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsUitlisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
