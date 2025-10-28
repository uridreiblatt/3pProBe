import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cylinder } from './entities/cylinder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CylinderService {
  constructor(
    @InjectRepository(Cylinder)
    private cylinderRepository: Repository<Cylinder>,
  ) {}

  async findAll() {
    return await this.cylinderRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} cylinder`;
  // }

  // update(id: number, updateCylinderDto: UpdateCylinderDto) {
  //   return `This action updates a #${id} cylinder`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cylinder`;
  // }
}
