import { Injectable } from '@nestjs/common';
import { CreateTaskRmaDto } from './dto/create-task-rma.dto';
import { UpdateTaskRmaDto } from './dto/update-task-rma.dto';
import { TaskRma } from './entities/task-rma.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskUser } from '../task-user/entities/task-user.entity';
import { AllRma } from '../all-rma/entities/all-rma.entity';

@Injectable()
export class TaskRmaService {

  constructor(
        @InjectRepository(TaskRma)
        private taskRmaRepository: Repository<TaskRma>,    
      ) {   
      }


  async create(createTaskRmaDto: CreateTaskRmaDto) {
    const ins =  new TaskRma();
    ins.allRma =  new AllRma();
    ins.allRma.id = createTaskRmaDto.rmaId;
    return await this.taskRmaRepository.save(ins);
    
  }

  async findAll(rmaId: string) {
    return await this.taskRmaRepository.find({
      where: {
        allRma: {id: rmaId}
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
    ins.allRma =  new AllRma();
    ins.allRma.id = updateTaskRmaDto.rmaId;
    return await this.taskRmaRepository.update(id, ins);
  }

  async remove(id: string) {
    return await this.taskRmaRepository.delete(id);
  }
}
