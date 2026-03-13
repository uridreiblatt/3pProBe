import { PartialType } from '@nestjs/swagger';
import { CreateNewCompanyDto } from './create-new-company.dto';

export class UpdateNewCompanyDto extends PartialType(CreateNewCompanyDto) {}
