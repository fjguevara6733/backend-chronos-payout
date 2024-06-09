import { Test, TestingModule } from '@nestjs/testing';
import { StarspayService } from './starspay.service';

describe('StarspayService', () => {
  let service: StarspayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarspayService],
    }).compile();

    service = module.get<StarspayService>(StarspayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
