import { Injectable } from '@nestjs/common';
import { Boxsize } from './entities/box.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
//import { CreateBoxDto } from './dto/create-box.dto';
//import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxesService {
  constructor(
    @InjectRepository(Boxsize)
    private boxRepository: Repository<Boxsize>,
  ) {}
  async create(createBoxDto: CreateBoxDto, userId: string) {
    const ins = new  Boxsize();
    ins.sizeDesc = createBoxDto.sizeDesc;
    ins.updatedBy= userId;
    ins.createdAt= new Date();
    ins.company = { id:  createBoxDto.companyId} as any;
    return await this.boxRepository.save(ins);
  }

  async findAll(companyId: string): Promise<Boxsize[]> {
    return await this.boxRepository.find({
      where: {
        company:{ id: companyId} ,
      },
      relations:{
        company: true,
      },
      order: {
        sizeDesc: 'ASC',
      },
    });
  }
  async findOne(id: string): Promise<Boxsize> {
    return await this.boxRepository.findOne({
      where: {
         id: id ,
      },
      relations:{
        company: true,
      },
      order: {
        sizeDesc: 'ASC',
      },
    });
  }

  async findOneByBarcode(barcodeId: string): Promise<any> {
    const sqlQuery =
      " SELECT [PARTNAME] FROM [dbo].[v_priorityProducts] WHERE [BARCODE]='" +
      barcodeId +
      "'";
    const res = await this.boxRepository.query(sqlQuery);
    return res[0];
  }

  async update(id: number, updateBoxDto: UpdateBoxDto) {
    const ins = new  Boxsize();
    ins.sizeDesc = updateBoxDto.sizeDesc;
    ins.company = new Company() ;
    ins.company.id =updateBoxDto.companyId;
    return await this.boxRepository.update(id, ins);
  }

  async remove(id: number) {
    return await this.boxRepository.delete(id);
  }
}
