import { Module } from '@nestjs/common';
import { CompanySettingsService } from './company-settings.service';
import { CompanySettingsController } from './company-settings.controller';
import { CompanySetting } from './entities/company-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([CompanySetting])],
  controllers: [CompanySettingsController],
  providers: [CompanySettingsService],
})
export class CompanySettingsModule {}
