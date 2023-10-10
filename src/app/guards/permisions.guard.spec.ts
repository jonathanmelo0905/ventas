import { TestBed } from '@angular/core/testing';

import { PermisionsGuard } from './permisions.guard';

describe('PermisionsGuard', () => {
  let guard: PermisionsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermisionsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
