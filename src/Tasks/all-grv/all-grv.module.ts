import { Module } from "@nestjs/common";
import { AllGrvService } from "./all-grv.service";
import { AllGrvController } from "./all-grv.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskGrv } from "../task-grv/entities/task-grv.entity";
import { AllGrv } from "./entities/all-grv.entity";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { DbLogModule } from "src/db-log/db-log.module";
import { CompanyModule } from "src/usersCompanies/company/company.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AllGrv, TaskGrv]),
    DbLogModule,
    CompanyModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [AllGrvController],
  providers: [AllGrvService],
})
export class AllGrvModule {}
