import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionUpdateComponent } from './promotion-update.component';

describe('FiliereCreationComponent', () => {
  let component: PromotionUpdateComponent;
  let fixture: ComponentFixture<PromotionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
