import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./usersCompanies/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SmsModule } from "./futureDev/sms/sms.module";
import { ScheduleModule } from "@nestjs/schedule";
import { EsModule } from "./futureDev/es/es.module";
import { TaskStatusModule } from "./settings/task-status/task-status.module";
import { TaskUserModule } from "./Tasks/task-user/task-user.module";
import { OrderModule } from "./orders/order/order.module";
import { OrderLinesModule } from "./orders/order-lines/order-lines.module";
import { ReportViewModule } from "./report-view/report-view.module";
import { GetOrderInfoModule } from "./orders/get-order-info/get-order-info.module";
import { BoxesModule } from "./maintenence/boxes/boxes.module";
import { OrderBoxesModule } from "./orders/order-boxes/order-boxes.module";
import { ShipmentPriorityModule } from "./maintenence/shipment_priority/shipment_priority.module";
import { DbLogModule } from "./db-log/db-log.module";
import { TaskTypeModule } from "./settings/task-type/task-type.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { PartsModule } from "./products/priorityProducts/priorityProducts.module";
import { PriorityProductsHierarchyModule } from "./products/priorityProductsHierarchy/priority-products-hierarchy.module";
import { OrderBasketModule } from "./orders/order-basket/order-basket.module";
import { PriorityProductsLocationsModule } from "./products/priority-products-locations/priority-products-locations.module";
import { CylinderModule } from "./maintenence/cylinder/cylinder.module";
import { ShipRushModule } from "./shipments/ship-rush/ship-rush.module";
import { PartCqauntModule } from "./settings/part-cqaunt/part-cqaunt.module";
import { CompanyModule } from "./usersCompanies/company/company.module";
import { UserCompanyModule } from "./usersCompanies/user-company/user-company.module";
import { ZoneModule } from "./maintenence/zone/zone.module";
import { RoleModule } from "./usersCompanies/role/role.module";
import { UserRoleModule } from "./usersCompanies/user-role/user-role.module";
import { ErrorLogService } from "./core/error-log.service";
import { Log } from "./db-log/entities/db-log.entity";
import {
  COOKIE_MATCH_OPTS,
  CookieMatchGuard,
  CookieMatchOptions,
} from "src/auth/cookie-body-match.guard"; // 'src/auth/cookie-body-match.guard';

const cookieMatchOpts: CookieMatchOptions = {
  cookieName: "companyId",
  bodyFieldPath: "companyId",
  bodyMethods: ["POST","PUT", "PATCH"],
  paramName: "companyId",
  paramMethods: ["GET",  "DELETE"],
};

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ".env.local",
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ScheduleModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"), //'compulockOrders',
        options: {
          //encrypt: true,
          //trustedConnection: true,
          //trustServerCertificate: true,
        },
        entities: [__dirname + "/**/**/*.entity{.ts,.js}"],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Log]), // ✅ Required
    CompanyModule,
    UserCompanyModule,
    BoxesModule,
    ZoneModule,
    RoleModule,
    UserRoleModule,
    OrderModule,
    SmsModule,
    EsModule,
    TaskStatusModule,
    TaskUserModule,
    OrderLinesModule,
    ReportViewModule,
    GetOrderInfoModule,
    OrderBoxesModule,
    ShipmentPriorityModule,
    DbLogModule,
    TaskTypeModule,
    PartsModule,
    PriorityProductsHierarchyModule,
    OrderBasketModule,
    PriorityProductsLocationsModule,
    CylinderModule,
    ShipRushModule,
    PartCqauntModule,
  ],
  controllers: [],
  providers: [
    AppService,
    ErrorLogService,
    { provide: COOKIE_MATCH_OPTS, useValue: cookieMatchOpts },
    { provide: APP_GUARD, useClass: CookieMatchGuard }, // run this first
    { provide: APP_GUARD, useClass: RolesGuard }, // then roles
  ],
})
export class AppModule {}
