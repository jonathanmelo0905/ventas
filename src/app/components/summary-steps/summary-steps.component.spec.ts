import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryStepsComponent } from './summary-steps.component';

describe('SummaryStepsComponent', () => {
  let component: SummaryStepsComponent;
  let fixture: ComponentFixture<SummaryStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
