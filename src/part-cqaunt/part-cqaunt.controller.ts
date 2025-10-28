import { Controller, Get } from '@nestjs/common';
import { PartCqauntService } from './part-cqaunt.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('part-cqaunt')
@Controller('part-cqaunt')
export class PartCqauntController {
  constructor(private readonly partCqauntService: PartCqauntService) {}

  @Get()
  findAll() {
    return this.partCqauntService.findAll();
  }
}
