import { Injectable } from '@nestjs/common';
import { CreateTaskRmaDto } from './dto/create-task-rma.dto';
import { UpdateTaskRmaDto } from './dto/update-task-rma.dto';

@Injectable()
export class TaskRmaService {
  create(createTaskRmaDto: CreateTaskRmaDto) {
    return 'This action adds a new taskRma';
  }

  findAll() {
    return `This action returns all taskRma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskRma`;
  }

  update(id: number, updateTaskRmaDto: UpdateTaskRmaDto) {
    return `This action updates a #${id} taskRma`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskRma`;
  }
}
