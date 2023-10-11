import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetClientComponent } from './target-client.component';

describe('TargetClientComponent', () => {
  let component: TargetClientComponent;
  let fixture: ComponentFixture<TargetClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
