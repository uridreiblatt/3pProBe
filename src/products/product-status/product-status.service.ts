import { Injectable } from '@nestjs/common';
import { CreateProductStatusDto } from './dto/create-product-status.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { ProductStatus } from './entities/product-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Company } from 'src/usersCompanies/company/entities/company.entity';

@Injectable()
export class ProductStatusService {
  constructor(
    @InjectRepository(ProductStatus)
    private productStatusRepository: Repository<ProductStatus>,
  ) {}

  async create(companyId: string) {
    const sql =
      'SELECT DISTINCT STATDES FROM priorityProducts WHERE companyId = ?';

    const newProductStatus = await this.productStatusRepository.query(sql, [
      companyId,
    ]);
    // newProductStatus.forEach((element) => {
    //   const productStatus = new ProductStatus();
    //   productStatus.productStatus = element.STATDES;
    //   productStatus.company = { id: companyId } as any;

    //   this.productStatusRepository.save(productStatus).catch((err) => {
    //     //Duplicate entry 'WSL-aaa-aaa-aaa' for key 'product-status.productStatus_UNIQUE'",
    //   });
    // });
    for (const element of newProductStatus) {
      const productStatus = new ProductStatus();
      productStatus.productStatus = element.STATDES;
      productStatus.company = { id: companyId } as Company;

      try {
        await this.productStatusRepository.save(productStatus);
      } catch (error) {
        if (
          !(error instanceof QueryFailedError) ||
          error.driverError?.code !== 'ER_DUP_ENTRY'
        ) {
          throw error;
        }
      }
    }
  }

  findAll(selectCompany: string) {
    return this.productStatusRepository.find({
      where: { company: { id: selectCompany } },
    });
  }

  async findOne(id: string, companyId: string) {
    return await this.productStatusRepository.findOne({
      where: { id: id, company: { id: companyId } },
    });
  }

  async update(
    id: string,
    updateProductStatusDto: UpdateProductStatusDto,
    companyId: string,
  ) {
    return await this.productStatusRepository.update(
      { id, company: { id: companyId } },
      updateProductStatusDto,
    );
  }

  async remove(id: string, companyId: string) {
    return await this.productStatusRepository.delete({
      id,
      company: { id: companyId },
    });
  }
}
