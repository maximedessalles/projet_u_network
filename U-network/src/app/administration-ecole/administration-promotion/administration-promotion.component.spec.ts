import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPromotionComponent } from './administration-promotion.component';

describe('AdministrationEcoleComponent', () => {
  let component: AdministrationPromotionComponent;
  let fixture: ComponentFixture<AdministrationPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
