import { Test, TestingModule } from '@nestjs/testing';
import { IssuancesService } from './issuances.service';

describe('IssuancesService', () => {
  let service: IssuancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuancesService],
    }).compile();

    service = module.get<IssuancesService>(IssuancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
