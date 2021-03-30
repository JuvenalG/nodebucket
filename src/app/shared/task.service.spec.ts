/**
 * Title: task.service.spec.ts
 * Author: Professor Krasso
 * Date: 29 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: testing for tast.service done here
 */

import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
