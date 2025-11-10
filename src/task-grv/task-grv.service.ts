import { Injectable } from '@nestjs/common';
import { CreateTaskGrvDto } from './dto/create-task-grv.dto';
import { UpdateTaskGrvDto } from './dto/update-task-grv.dto';

@Injectable()
export class TaskGrvService {
  create(createTaskGrvDto: CreateTaskGrvDto) {
    return 'This action adds a new taskGrv';
  }

  findAll() {
    return `This action returns all taskGrv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskGrv`;
  }

  update(id: number, updateTaskGrvDto: UpdateTaskGrvDto) {
    return `This action updates a #${id} taskGrv`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskGrv`;
  }
}
