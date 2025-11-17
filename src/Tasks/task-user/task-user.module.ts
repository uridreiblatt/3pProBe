import { forwardRef, Module } from "@nestjs/common";
import { TaskUserService } from "./task-user.service";
import { TaskUserController } from "./task-user.controller";
import { TaskUser } from "./entities/task-user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "src/orders/order/order.module";
import { HttpModule } from "@nestjs/axios";
import { DbLogModule } from "src/db-log/db-log.module";
import { ConfigModule } from "@nestjs/config";
import { TaskGrv } from "../task-grv/entities/task-grv.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskUser, TaskGrv]),
    forwardRef(() => OrderModule),
    DbLogModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [TaskUserController],
  providers: [TaskUserService],
  exports: [TaskUserService],
})
export class TaskUserModule {}
