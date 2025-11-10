import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateTaskInventoryCountDto } from './dto/update-task-inventory-count.dto';
import { TaskInventoryCount } from './entities/task-inventory-count.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { TaskUser } from '../task-user/entities/task-user.entity';


@Injectable()
export class TaskInventoryCountService { 
  constructor(
    @InjectRepository(TaskInventoryCount)
    private taskInventoryCountServiceRepository: Repository<TaskInventoryCount>,    
  ) {   
  }

  async findAll(taskUserId: string) {
    return await this.taskInventoryCountServiceRepository.find({
      
      where: {
        taskUser: {id: taskUserId}
       
      },
      relations: {        
        taskUser:  true,
      },
      
    });
  }

  async findOne(id: string) {
    return await this.taskInventoryCountServiceRepository.findOne({
      where: {
        id: id,
      },
      relations: {        
        taskUser:  true,
      },
     
    });
  }

  

  

  async create(createTaskInventoryCountDto: any) {   
    let taskInventoryCount = new TaskInventoryCount();
    taskInventoryCount = createTaskInventoryCountDto;
    taskInventoryCount.taskUser =  new TaskUser();
    taskInventoryCount.taskUser.id = createTaskInventoryCountDto.taskUserId;
    return await this.taskInventoryCountServiceRepository.save(taskInventoryCount);
  }

  async update(id: string, updateTaskInventoryCountDto: UpdateTaskInventoryCountDto) { 
    const res = await this.taskInventoryCountServiceRepository.update(id, updateTaskInventoryCountDto);
    return res;
  }
  
  async remove(id: string) {    
    return await this.taskInventoryCountServiceRepository.delete(id);
  }
}
