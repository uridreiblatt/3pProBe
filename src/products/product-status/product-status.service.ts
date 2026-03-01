import { Injectable } from '@nestjs/common';
import { CreateProductStatusDto } from './dto/create-product-status.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { ProductStatus } from './entities/product-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductStatusService {
  constructor(
        @InjectRepository(ProductStatus)
        private productStatusRepository: Repository<ProductStatus>,
      ) {}

  async create(createProductStatusDto: CreateProductStatusDto) {
    const sql = `SELECT distinct STATDES  FROM p3pro.priorityproducts where companyId  ='${createProductStatusDto.companyId}'`;
    console.log(sql);
    const newProductStatus = await this.productStatusRepository.query(sql);
    newProductStatus.forEach((element) => {      const productStatus = new ProductStatus();
      productStatus.productStatus = element.STATDES;
      productStatus.company = {id: createProductStatusDto.companyId} as any;

      this.productStatusRepository.save(productStatus).catch((err) => {
        //Duplicate entry 'WSL-aaa-aaa-aaa' for key 'product-status.productStatus_UNIQUE'",
      });      
    });

  }

  findAll(selectCompany: string) {
    return this.productStatusRepository.find({where: {company: {id: selectCompany}, isActive: true}} );
  }

  async findOne(id: string) {
    return await this.productStatusRepository.findOne({
      where: {id: id},
    });
  }

  async update(id: string, updateProductStatusDto: UpdateProductStatusDto) {
    console.log(updateProductStatusDto);
     const { companyId, ...rest } = updateProductStatusDto;
    return await this.productStatusRepository.update(id, rest);
  }

  async remove(id: string) {
    return await this.productStatusRepository.delete(id);
  }
}
