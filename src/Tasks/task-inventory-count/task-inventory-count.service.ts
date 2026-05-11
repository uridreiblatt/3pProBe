import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateTaskInventoryCountDto } from './dto/update-task-inventory-count.dto';
import { TaskInventoryCount } from './entities/task-inventory-count.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { TaskUser } from '../task-user/entities/task-user.entity';
import { AllInventoryCount } from '../all_inventory/entities/all-inventory.entity';

@Injectable()
export class TaskInventoryCountService {
  constructor(
    @InjectRepository(TaskInventoryCount)
    private taskInventoryCountServiceRepository: Repository<TaskInventoryCount>,
  ) {}

  async findAll(taskUserId: string, id: string) {
    return await this.taskInventoryCountServiceRepository.find({
      where: {
        allInventoryCount: { id: id },
      },
      // relations: {
      //   taskUser:  true,
      // },
    });
  }

  async findOne(id: string) {
    const res = await this.taskInventoryCountServiceRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        allInventoryCount: true,
      },
    });

    const { allInventoryCount, ...rest } = res;

    return {
      ...rest,
      allInventoryCountId: allInventoryCount.id,
    };
  }

  async create(createTaskInventoryCountDto: any) {
    let taskInventoryCount = new TaskInventoryCount();
    taskInventoryCount = createTaskInventoryCountDto;
    taskInventoryCount.allInventoryCount = new AllInventoryCount();
    taskInventoryCount.allInventoryCount.id =
      createTaskInventoryCountDto.allInventoryCountId;
    taskInventoryCount.productName = createTaskInventoryCountDto.productName;
    taskInventoryCount.productDescription =
      createTaskInventoryCountDto.productDescription;
    taskInventoryCount.location = createTaskInventoryCountDto.location;

    return await this.taskInventoryCountServiceRepository.save(
      taskInventoryCount,
    );
  }

  async update(
    id: string,
    updateTaskInventoryCountDto: UpdateTaskInventoryCountDto,
  ) {
    const ins = new TaskInventoryCount();
    ins.DataInfo = updateTaskInventoryCountDto.DataInfo;
    ins.NoOfItems_0 = updateTaskInventoryCountDto.NoOfItems_0;
    ins.NoOfBoxes_0 = updateTaskInventoryCountDto.NoOfBoxes_0;
    ins.NoOfItems_1 = updateTaskInventoryCountDto.NoOfItems_1;
    ins.NoOfBoxes_1 = updateTaskInventoryCountDto.NoOfBoxes_1;
    ins.NoOfItems_2 = updateTaskInventoryCountDto.NoOfItems_2;
    ins.NoOfBoxes_2 = updateTaskInventoryCountDto.NoOfBoxes_2;
    ins.NoOfItems_3 = updateTaskInventoryCountDto.NoOfItems_3;
    ins.NoOfBoxes_3 = updateTaskInventoryCountDto.NoOfBoxes_3;
    ins.NoOfItems_4 = updateTaskInventoryCountDto.NoOfItems_4;
    ins.NoOfBoxes_4 = updateTaskInventoryCountDto.NoOfBoxes_4;
    ins.NoOfItems_5 = updateTaskInventoryCountDto.NoOfItems_5;
    ins.NoOfBoxes_5 = updateTaskInventoryCountDto.NoOfBoxes_5;
    ins.bulkQauntity = updateTaskInventoryCountDto.bulkQauntity;
    ins.productName = updateTaskInventoryCountDto.productName;
    ins.productDescription = updateTaskInventoryCountDto.productDescription;
    ins.location = updateTaskInventoryCountDto.location;
    ins.Total = updateTaskInventoryCountDto.Total;
    ins.allInventoryCount = new AllInventoryCount();
    ins.allInventoryCount.id =
      updateTaskInventoryCountDto.allInventoryCountId || 'sdsadas';
    const res = await this.taskInventoryCountServiceRepository.update(id, ins);
    return res;
  }

  async remove(id: string) {
    return await this.taskInventoryCountServiceRepository.delete(id);
  }
}
