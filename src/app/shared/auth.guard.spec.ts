/**
 * Title: auth.guard.spec.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: testing for auth.guard.ts
 */

import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
