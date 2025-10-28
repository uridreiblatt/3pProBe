import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskType } from './entities/task-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskTypeService {
  constructor(
    @InjectRepository(TaskType)
    private TaskTypeRepository: Repository<TaskType>,
  ) {}

  async findAll() {
    return await this.TaskTypeRepository.find();
  }
}
