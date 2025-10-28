import { Injectable, Logger } from '@nestjs/common';
import { CreateDbLogDto } from './dto/create-db-log.dto';
import { DbLog } from './entities/db-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DbLogService {
  private readonly logger = new Logger(DbLogService.name);
  constructor(
    @InjectRepository(DbLog)
    private DbLogRepository: Repository<DbLog>,
  ) {}

  async create(createDbLogDto: CreateDbLogDto): Promise<any> {
    try {
      return await this.DbLogRepository.save(createDbLogDto);
    } catch (error) {
      this.logger.error('ffffffffffffffffffffffffff' + error);
    }
  }

  async findAll() {
    return await this.DbLogRepository.find();
  }
}
