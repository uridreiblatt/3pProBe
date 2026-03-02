import { Module } from "@nestjs/common";
import { priorityProductsService } from "./priorityProducts.service";
import { PriorityProductsController } from "./priorityProducts.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { PriorityProducts } from "./entities/priorityProducts.entity";
import { HttpModule } from "@nestjs/axios";
import { PriorityProductsHierarchy } from "../priorityProductsHierarchy/entities/priority-products-hierarchy.entity";
import { CompanyModule } from "src/usersCompanies/company/company.module";
import { ProductStatusService } from "../product-status/product-status.service";
import { ProductStatusModule } from "../product-status/product-status.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([PriorityProducts, PriorityProductsHierarchy]),
    HttpModule,
    CompanyModule,
    ProductStatusModule,
  ],
  controllers: [PriorityProductsController],
  providers: [priorityProductsService],
})
export class PartsModule {}
