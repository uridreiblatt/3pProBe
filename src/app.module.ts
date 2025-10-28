import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsModule } from './sms/sms.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EsModule } from './es/es.module';
import { TaskStatusModule } from './task-status/task-status.module';
import { TaskUserModule } from './task-user/task-user.module';
import { OrderModule } from './order/order.module';
import { OrderLinesModule } from './order-lines/order-lines.module';
import { ReportViewModule } from './report-view/report-view.module';
import { GetOrderInfoModule } from './get-order-info/get-order-info.module';
import { BoxesModule } from './boxes/boxes.module';
import { OrderBoxesModule } from './order-boxes/order-boxes.module';
import { ShipmentPriorityModule } from './shipment_priority/shipment_priority.module';
import { DbLogModule } from './db-log/db-log.module';
import { TaskTypeModule } from './task-type/task-type.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { PartsModule } from './priorityProducts/priorityProducts.module';
import { PriorityProductsHierarchyModule } from './priorityProductsHierarchy/priority-products-hierarchy.module';
import { OrderBasketModule } from './order-basket/order-basket.module';
import { PriorityProductsLocationsModule } from './priority-products-locations/priority-products-locations.module';
import { CylinderModule } from './cylinder/cylinder.module';
import { ShipRushModule } from './ship-rush/ship-rush.module';
import { PartCqauntModule } from './part-cqaunt/part-cqaunt.module';
import { CompanyModule } from './company/company.module';
import { UserCompanyModule } from './user-company/user-company.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ScheduleModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'), //'compulockOrders',
        options: {
          //encrypt: true,
          //trustedConnection: true,
          //trustServerCertificate: true,
        },
        entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    OrderModule,
    SmsModule,
    EsModule,
    TaskStatusModule,
    TaskUserModule,
    OrderLinesModule,
    ReportViewModule,
    GetOrderInfoModule,
    BoxesModule,
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
    CompanyModule,
    UserCompanyModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
