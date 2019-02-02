import { TestBed } from '@angular/core/testing';

import { MoodStorageService } from './mood-storage.service';

describe('MoodStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoodStorageService = TestBed.get(MoodStorageService);
    expect(service).toBeTruthy();
  });
});
