import { Test, TestingModule } from '@nestjs/testing';
import { IssuancesController } from './issuances.controller';

describe('IssuancesController', () => {
  let controller: IssuancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuancesController],
    }).compile();

    controller = module.get<IssuancesController>(IssuancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
