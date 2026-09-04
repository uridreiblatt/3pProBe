import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTaskInventoryCountDto } from './dto/update-task-inventory-count.dto';
import { TaskInventoryCount } from './entities/task-inventory-count.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { TaskUser } from '../task-user/entities/task-user.entity';
import { AllInventoryCount } from '../all_inventory/entities/all-inventory.entity';
import { CreateTaskInventoryCountDto } from './dto/create-task-inventory-count.dto';

@Injectable()
export class TaskInventoryCountService {
  constructor(
    @InjectRepository(TaskInventoryCount)
    private taskInventoryCountServiceRepository: Repository<TaskInventoryCount>,
  ) {}

  async findAll(id: string, companyId: string) {
    return await this.taskInventoryCountServiceRepository.find({
      where: {
        allInventoryCount: { id: id, company: { id: companyId } },
      },
      // relations: {
      //   taskUser:  true,
      // },
    });
  }

  async findOne(id: string, companyId: string) {
    const res = await this.taskInventoryCountServiceRepository.findOne({
      where: {
        id: id,
        allInventoryCount: { company: { id: companyId } },
      },
      relations: {
        allInventoryCount: true,
      },
    });

    const { allInventoryCount, ...rest } = res;

    return {
      ...rest,
      allInventoryCountId: allInventoryCount.id,
      allInventoryCount: {
        location: allInventoryCount.Location,
        productName: allInventoryCount.productName,
        productDescription: allInventoryCount.productDescription,
        partNumber: allInventoryCount.PartNumber,
        remarks: allInventoryCount.remarks,
      },
    };
  }

  async create(dto: CreateTaskInventoryCountDto, companyId: string) {
    return this.taskInventoryCountServiceRepository.manager.transaction(
      async (manager) => {
        const taskRepository = manager.getRepository(TaskInventoryCount);
        const parentRepository = manager.getRepository(AllInventoryCount);

        const parent = await parentRepository.findOne({
          where: {
            id: dto.allInventoryCountId,
            company: {
              id: companyId,
            },
          },
          select: {
            id: true,
          },
          lock: {
            mode: 'pessimistic_read',
          },
        });

        if (!parent) {
          throw new NotFoundException(
            'Inventory-count parent not found for this company',
          );
        }

        const { allInventoryCountId, ...taskData } = dto;

        const task = taskRepository.create({
          ...taskData,
          allInventoryCount: parent,
        });

        return taskRepository.save(task);
      },
    );
  }

  async update(
    companyId: string,
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
    //ins.allInventoryCount = new AllInventoryCount();
    //ins.allInventoryCount.id = updateTaskInventoryCountDto.allInventoryCountId;
    const res = await this.taskInventoryCountServiceRepository.update(
      { id, allInventoryCount: { company: { id: companyId } } },
      ins,
    );
    return res;
  }

  async remove(companyId: string, id: string) {
    return this.taskInventoryCountServiceRepository.manager.transaction(
      async (manager) => {
        const repository = manager.getRepository(TaskInventoryCount);

        const task = await repository.findOne({
          where: {
            id,
            allInventoryCount: {
              company: { id: companyId },
            },
          },
          select: {
            id: true,
          },
          lock: {
            mode: 'pessimistic_write',
          },
        });

        if (!task) {
          throw new NotFoundException(
            'Inventory-count task not found for this company',
          );
        }

        return repository.delete(task.id);
      },
    );
  }
}
