import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartCqaunt } from './entities/part-cqaunt.entity';

@Injectable()
export class PartCqauntService {
  constructor(
    @InjectRepository(PartCqaunt)
    private PartCQuantRepository: Repository<PartCqaunt>,
  ) {}
  async findAll() {
    return this.PartCQuantRepository.find();
  }
}
