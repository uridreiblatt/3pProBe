import { Injectable } from '@nestjs/common';
import { Boxsize } from './entities/box.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { CreateBoxDto } from './dto/create-box.dto';
//import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxesService {
  constructor(
    @InjectRepository(Boxsize)
    private boxRepository: Repository<Boxsize>,
  ) {}
  // create(createBoxDto: CreateBoxDto) {
  //   return 'This action adds a new box';
  // }

  async findAll(): Promise<Boxsize[]> {
    return await this.boxRepository.find({
      order: {
        sizeDesc: 'ASC',
      },
    });
  }

  // async findOne(id: string): Promise<any> {
  //   const sqlQuery =
  //     " SELECT [PARTNAME] FROM [dbo].[v_priorityProducts] WHERE [BARCODE]='" +
  //     id +
  //     "'";
  //   const res = await this.boxRepository.query(sqlQuery);
  //   return res[0];
  // }

  // update(id: number, updateBoxDto: UpdateBoxDto) {
  //   return `This action updates a #${id} box`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} box`;
  // }
}
