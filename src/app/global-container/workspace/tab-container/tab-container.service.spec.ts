import { TestBed } from '@angular/core/testing';

import { TabContainerService } from './tab-container.service';

describe('TabContainerService', () => {
  let service: TabContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
