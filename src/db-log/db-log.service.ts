import { Injectable, Logger } from '@nestjs/common';
import { CreateDbLogDto } from './dto/create-db-log.dto';
import { Log } from './entities/db-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from 'typeorm/persistence/Subject';

@Injectable()
export class DbLogService {
  private readonly logger = new Logger(DbLogService.name);
  constructor(
    @InjectRepository(Log)
    private DbLogRepository: Repository<Log>,
  ) {}

  async create(createDbLogDto: CreateDbLogDto): Promise<any> {
    try {
      if(createDbLogDto.subject.length > 999)      
        createDbLogDto.subject= createDbLogDto.subject.substring(0,997);
      if(createDbLogDto.message.length > 3999)      
        createDbLogDto.subject= createDbLogDto.subject.substring(0,3997);
 
      return await this.DbLogRepository.save(createDbLogDto);
    } catch (error) {
      this.logger.error( error);
    }
  }

  async findAll(selectCompanyId: string) {
     return await this.DbLogRepository.find({
      where: {companyId:  selectCompanyId}
    });
  }


  async findOne(id: number) {
    return this.DbLogRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
