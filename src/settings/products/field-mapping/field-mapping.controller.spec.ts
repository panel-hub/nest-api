import { Test, TestingModule } from '@nestjs/testing';
import { FieldMappingController } from './field-mapping.controller';
import { FieldMappingService } from './field-mapping.service';

describe('FieldMappingController', () => {
  let controller: FieldMappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldMappingController],
      providers: [FieldMappingService],
    }).compile();

    controller = module.get<FieldMappingController>(FieldMappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
