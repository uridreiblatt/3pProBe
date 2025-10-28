import { Controller } from '@nestjs/common';
import { SmsService } from './sms.service';
//import { CreateSmDto } from './dto/create-sms.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('sms')
@ApiTags('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  // @Post()
  // create(@Body() createSmDto: CreateSmDto) {
  //   const Res = this.smsService.create(createSmDto);
  //   return Res;
  // }
}
