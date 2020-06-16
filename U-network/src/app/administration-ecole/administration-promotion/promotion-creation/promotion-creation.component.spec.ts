import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { promotionCreationComponent } from './promotion-creation.component';

describe('promotionCreationComponent', () => {
  let component: promotionCreationComponent;
  let fixture: ComponentFixture<promotionCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ promotionCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(promotionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
