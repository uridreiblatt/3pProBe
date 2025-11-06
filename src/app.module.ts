import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SmsModule } from "./sms/sms.module";
import { ScheduleModule } from "@nestjs/schedule";
import { EsModule } from "./es/es.module";
import { TaskStatusModule } from "./task-status/task-status.module";
import { TaskUserModule } from "./task-user/task-user.module";
import { OrderModule } from "./order/order.module";
import { OrderLinesModule } from "./order-lines/order-lines.module";
import { ReportViewModule } from "./report-view/report-view.module";
import { GetOrderInfoModule } from "./get-order-info/get-order-info.module";
import { BoxesModule } from "./boxes/boxes.module";
import { OrderBoxesModule } from "./order-boxes/order-boxes.module";
import { ShipmentPriorityModule } from "./shipment_priority/shipment_priority.module";
import { DbLogModule } from "./db-log/db-log.module";
import { TaskTypeModule } from "./task-type/task-type.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { PartsModule } from "./priorityProducts/priorityProducts.module";
import { PriorityProductsHierarchyModule } from "./priorityProductsHierarchy/priority-products-hierarchy.module";
import { OrderBasketModule } from "./order-basket/order-basket.module";
import { PriorityProductsLocationsModule } from "./priority-products-locations/priority-products-locations.module";
import { CylinderModule } from "./cylinder/cylinder.module";
import { ShipRushModule } from "./ship-rush/ship-rush.module";
import { PartCqauntModule } from "./part-cqaunt/part-cqaunt.module";
import { CompanyModule } from "./company/company.module";
import { UserCompanyModule } from "./user-company/user-company.module";
import { ZoneModule } from "./zone/zone.module";
import { RoleModule } from "./role/role.module";
import { UserRoleModule } from "./user-role/user-role.module";
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
    //{ provide: APP_GUARD, useClass: RolesGuard }, // then roles
  ],
})
export class AppModule {}
