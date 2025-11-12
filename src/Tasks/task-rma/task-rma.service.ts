import { Injectable } from '@nestjs/common';
import { CreateTaskRmaDto } from './dto/create-task-rma.dto';
import { UpdateTaskRmaDto } from './dto/update-task-rma.dto';
import { TaskRma } from './entities/task-rma.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskUser } from '../task-user/entities/task-user.entity';

@Injectable()
export class TaskRmaService {

  constructor(
        @InjectRepository(TaskRma)
        private taskRmaRepository: Repository<TaskRma>,    
      ) {   
      }


  async create(createTaskRmaDto: CreateTaskRmaDto) {
    const ins =  new TaskRma();
    ins.taskUser =  new TaskUser();
    ins.taskUser.id = createTaskRmaDto.taskUserId;
    return await this.taskRmaRepository.save(ins);
    
  }

  async findAll(taskUserId: string) {
    return await this.taskRmaRepository.find({
      where: {
        taskUser: {id: taskUserId}
      }
    });
  }

  async findOne(id: string) {
    return await this.taskRmaRepository.findOne({
      where: {id:  id}
    });
  }

  async update(id: string, updateTaskRmaDto: UpdateTaskRmaDto) {
     const ins =  new TaskRma();
    ins.taskUser =  new TaskUser();
    ins.taskUser.id = updateTaskRmaDto.taskUserId;
    return await this.taskRmaRepository.update(id, ins);
  }

  async remove(id: string) {
    return await this.taskRmaRepository.delete(id);
  }
}
