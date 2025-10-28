import { Injectable } from '@nestjs/common';
import { TaskStatus } from './entities/task-status.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private taskStatusRepository: Repository<TaskStatus>,
  ) {}

  async findAll(): Promise<any> {
    return await this.taskStatusRepository.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.taskStatusRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
