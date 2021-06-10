import { TestBed } from '@angular/core/testing';

import { MixcloudapiService } from './mixcloudapi.service';

describe('MixcloudapiService', () => {
  let service: MixcloudapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MixcloudapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
