import { Test, TestingModule } from '@nestjs/testing';
import { StarspayController } from './starspay.controller';
import { StarspayService } from './starspay.service';

describe('StarspayController', () => {
  let controller: StarspayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarspayController],
      providers: [StarspayService],
    }).compile();

    controller = module.get<StarspayController>(StarspayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
