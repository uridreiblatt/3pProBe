import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserCompany } from '../user-company/entities/user-company.entity';
import { UsersRoles } from '../user-role/entities/user-role.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, UserCompany])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
