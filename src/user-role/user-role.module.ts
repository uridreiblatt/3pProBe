import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRoles } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRoles])],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
