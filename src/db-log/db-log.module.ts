import { Module } from '@nestjs/common';
import { DbLogService } from './db-log.service';
import { DbLogController } from './db-log.controller';
import { Log } from './entities/db-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [DbLogController],
  providers: [DbLogService],
  exports: [DbLogService],
})
export class DbLogModule {}
