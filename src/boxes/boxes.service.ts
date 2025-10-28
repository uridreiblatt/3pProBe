import { Injectable } from '@nestjs/common';
import { Boxsize } from './entities/box.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { Company } from 'src/company/entities/company.entity';
//import { CreateBoxDto } from './dto/create-box.dto';
//import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxesService {
  constructor(
    @InjectRepository(Boxsize)
    private boxRepository: Repository<Boxsize>,
  ) {}
  async create(createBoxDto: CreateBoxDto) {
    const ins = new  Boxsize();
    ins.sizeDesc = createBoxDto.sizeDesc;
    ins.company = new Company() ;
    ins.company.id =createBoxDto.CompanyId;
    return await this.boxRepository.save(ins);
  }

  async findAll(): Promise<Boxsize[]> {
    return await this.boxRepository.find({
      where: {
        company:{ id: 1} ,
      },
      relations:{
        company: true,
      },
      order: {
        sizeDesc: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const sqlQuery =
      " SELECT [PARTNAME] FROM [dbo].[v_priorityProducts] WHERE [BARCODE]='" +
      id +
      "'";
    const res = await this.boxRepository.query(sqlQuery);
    return res[0];
  }

  async update(id: number, updateBoxDto: UpdateBoxDto) {
    const ins = new  Boxsize();
    ins.sizeDesc = updateBoxDto.sizeDesc;
    ins.company = new Company() ;
    ins.company.id =updateBoxDto.CompanyId;
    return await this.boxRepository.update(id, ins);
  }

  async remove(id: number) {
    return await this.boxRepository.delete(id);
  }
}
