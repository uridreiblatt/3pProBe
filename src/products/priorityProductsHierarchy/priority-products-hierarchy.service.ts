import { Injectable } from '@nestjs/common';
import { PriorityProductsHierarchy } from './entities/priority-products-hierarchy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreatePartsHierarchyDto } from './dto/create-parts-hierarchy.dto';
// import { UpdatePartsHierarchyDto } from './dto/update-parts-hierarchy.dto';

@Injectable()
export class PriorityProductsHierarchyService {
  constructor(
    @InjectRepository(PriorityProductsHierarchy)
    private priorityProductsHierarchy: Repository<PriorityProductsHierarchy>,
  ) {}

  // create(createPartsHierarchyDto: CreatePartsHierarchyDto) {
  //   return 'This action adds a new partsHierarchy';
  // }

  async findAll() {
    return await this.priorityProductsHierarchy.find();
  }

  async findOne(id: string) {
    return await this.priorityProductsHierarchy.findOne({
      where: {
        id: id,
      },
    });
  }

  // update(id: number, updatePartsHierarchyDto: UpdatePartsHierarchyDto) {
  //   return `This action updates a #${id} partsHierarchy`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} partsHierarchy`;
  // }
}
