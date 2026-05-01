import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/usersCompanies/users/users.module';
import { DeliverySettingModule } from 'src/shipments/delivery-setting/delivery-setting.module';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    DeliverySettingModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
