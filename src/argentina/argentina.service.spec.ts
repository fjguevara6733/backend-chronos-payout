import { Test, TestingModule } from '@nestjs/testing';
import { ArgentinaService } from './argentina.service';

describe('ArgentinaService', () => {
  let service: ArgentinaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArgentinaService],
    }).compile();

    service = module.get<ArgentinaService>(ArgentinaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
