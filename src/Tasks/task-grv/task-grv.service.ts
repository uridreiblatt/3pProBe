import { Injectable } from '@nestjs/common';
import { CreateTaskGrvDto } from './dto/create-task-grv.dto';
import { UpdateTaskGrvDto } from './dto/update-task-grv.dto';
import { TaskGrv } from './entities/task-grv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskUser } from '../task-user/entities/task-user.entity';

@Injectable()
export class TaskGrvService {
  constructor(
      @InjectRepository(TaskGrv)
      private taskGrvRepository: Repository<TaskGrv>,    
    ) {   
    }


  async create(createTaskGrvDto: CreateTaskGrvDto) {
    const ins = new TaskGrv();
    ins.taskUser= new TaskUser();
    ins.taskUser.id = createTaskGrvDto.taskUserId;
    return await this.taskGrvRepository.save(ins);
    
  }

  async findAll(taskTypeId: string) {
    return await this.taskGrvRepository.find({
      where:{
        taskUser: {id: taskTypeId}
      }
    })
  }

  async findOne(id: string) {
    return await this.taskGrvRepository.find({
      where:{id: id}
    })
  }

  async update(id: string, updateTaskGrvDto: UpdateTaskGrvDto) {
    const ins = new TaskGrv();
    ins.taskUser= new TaskUser();
    ins.taskUser.id = updateTaskGrvDto.taskUserId;
    return await this.taskGrvRepository.save(ins);
  }

  async remove(id: string) {
     return await this.taskGrvRepository.delete(id);
     
  }
}
