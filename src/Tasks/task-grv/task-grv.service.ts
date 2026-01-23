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
    ins.DataInfo = createTaskGrvDto.DataInfo;
    ins.productName= createTaskGrvDto.productName;
    ins.PartNumber = createTaskGrvDto.PartNumber;
    ins.productDescription= createTaskGrvDto.productDescription;
    ins.NoOfItems_0= createTaskGrvDto.NoOfItems_0;
    ins.NoOfBoxes_0 = createTaskGrvDto.NoOfBoxes_0;
    ins.NoOfItems_1= createTaskGrvDto.NoOfItems_1;
    ins.NoOfBoxes_1 = createTaskGrvDto.NoOfBoxes_1;
    ins.NoOfItems_2= createTaskGrvDto.NoOfItems_2;
    ins.NoOfBoxes_2 = createTaskGrvDto.NoOfBoxes_2;
    ins.NoOfItems_3= createTaskGrvDto.NoOfItems_3;
    ins.NoOfBoxes_3 = createTaskGrvDto.NoOfBoxes_3;
    ins.NoOfItems_4= createTaskGrvDto.NoOfItems_4;
    ins.NoOfBoxes_4 = createTaskGrvDto.NoOfBoxes_4;
    ins.NoOfItems_5= createTaskGrvDto.NoOfItems_5;
    ins.NoOfBoxes_5 = createTaskGrvDto.NoOfBoxes_5;
    ins.bulkQauntity= createTaskGrvDto.bulkQauntity;
    ins.Total= createTaskGrvDto.Total;    
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
    const res = await this.taskGrvRepository.findOne({
      where:{id: id}, 
      relations :{taskUser: true},

    })
    const { taskUser, ...rest } = res;

    return {
      ...rest,
      taskUserId: taskUser.id,
    };
  }

  async update(id: string, updateTaskGrvDto: UpdateTaskGrvDto) {
    const ins = new TaskGrv();
    ins.DataInfo = updateTaskGrvDto.DataInfo;

    ins.NoOfItems_0= updateTaskGrvDto.NoOfItems_0;
    ins.PartNumber= updateTaskGrvDto.PartNumber;
    ins.productName= updateTaskGrvDto.productName;
    ins.productDescription= updateTaskGrvDto.productDescription;
    ins.NoOfBoxes_0 = updateTaskGrvDto.NoOfBoxes_0;
    ins.NoOfItems_1= updateTaskGrvDto.NoOfItems_1;
    ins.NoOfBoxes_1 = updateTaskGrvDto.NoOfBoxes_1;
    ins.NoOfItems_2= updateTaskGrvDto.NoOfItems_2;
    ins.NoOfBoxes_2 = updateTaskGrvDto.NoOfBoxes_2;
    ins.NoOfItems_3= updateTaskGrvDto.NoOfItems_3;
    ins.NoOfBoxes_3 = updateTaskGrvDto.NoOfBoxes_3;
    ins.NoOfItems_4= updateTaskGrvDto.NoOfItems_4;
    ins.NoOfBoxes_4 = updateTaskGrvDto.NoOfBoxes_4;
    ins.NoOfItems_5= updateTaskGrvDto.NoOfItems_5;
    ins.NoOfBoxes_5 = updateTaskGrvDto.NoOfBoxes_5;
    ins.bulkQauntity= updateTaskGrvDto.bulkQauntity;
    ins.Total= updateTaskGrvDto.Total;    
    ins.taskUser= new TaskUser();
    ins.taskUser.id = updateTaskGrvDto.taskUserId;
    return await this.taskGrvRepository.update(id, ins);
  }

  async remove(id: string) {
     return await this.taskGrvRepository.delete(id);
     
  }
}
