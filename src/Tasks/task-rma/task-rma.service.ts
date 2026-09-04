import { Injectable } from '@nestjs/common';
import { CreateTaskRmaDto } from './dto/create-task-rma.dto';
import { UpdateTaskRmaDto } from './dto/update-task-rma.dto';
import { TaskRma } from './entities/task-rma.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskUser } from '../task-user/entities/task-user.entity';
import { AllRma } from '../all-rma/entities/all-rma.entity';
import { rm } from 'fs';

@Injectable()
export class TaskRmaService {
  constructor(
    @InjectRepository(TaskRma)
    private taskRmaRepository: Repository<TaskRma>,
  ) {}

  async create(createTaskRmaDto: CreateTaskRmaDto) {
    const ins = new TaskRma();
    ins.allRma = new AllRma();
    ins.PartNumber = createTaskRmaDto.PartNumber;
    ins.productName = createTaskRmaDto.productName;
    ins.productDescription = createTaskRmaDto.productDescription;

    ins.partQount = createTaskRmaDto.partQount;
    ins.backToInventory = createTaskRmaDto.backToInventory;
    ins.productStatus = createTaskRmaDto.productStatus;
    ins.cylinder = createTaskRmaDto.cylinder;
    ins.remarks = createTaskRmaDto.remarks;
    ins.allRma.id = createTaskRmaDto.rmaId;
    return await this.taskRmaRepository.save(ins);
  }

  async findAll(rmaId: string) {
    return await this.taskRmaRepository.find({
      where: {
        allRma: { id: rmaId },
      },
    });
  }
  async findAllByRma(id: string, companyId: string) {
    return await this.taskRmaRepository.find({
      where: { allRma: { id: id, company: { id: companyId } } },
      relations: {
        allRma: true,
      },
    });
  }

  async findOne(id: string, companyId: string) {
    const res = await this.taskRmaRepository.findOne({
      where: { id: id, allRma: { company: { id: companyId } } },
      relations: {
        allRma: true,
      },
    });

    return {
      ...res,
      rmaId: res.allRma.id,
    };
  }

  async update(
    id: string,
    updateTaskRmaDto: UpdateTaskRmaDto,
    companyId: string,
  ) {
    const ins = new TaskRma();
    ins.PartNumber = updateTaskRmaDto.PartNumber;
    ins.partQount = updateTaskRmaDto.partQount;
    ins.backToInventory = updateTaskRmaDto.backToInventory;
    ins.productStatus = updateTaskRmaDto.productStatus;
    ins.cylinder = updateTaskRmaDto.cylinder;
    ins.remarks = updateTaskRmaDto.remarks;
    ins.productDescription = updateTaskRmaDto.productDescription;
    ins.productName = updateTaskRmaDto.productName;
    return await this.taskRmaRepository.update(
      { id, allRma: { company: { id: companyId } } },
      ins,
    );
  }

  async remove(id: string, companyId: string) {
    return await this.taskRmaRepository.delete({
      id,
      allRma: { company: { id: companyId } },
    });
  }
}
