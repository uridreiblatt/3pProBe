import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { OrderBasketService } from './order-basket.service';
import { CreateOrderBasketDto } from './dto/create-order-basket.dto';
import { UpdateOrderBasketDto } from './dto/update-order-basket.dto';
import { ApiTags } from '@nestjs/swagger';
import { validateCompany } from 'src/util/validateCompany.util';
@ApiTags('order-basket')
@Controller('order-basket')
export class OrderBasketController {
  constructor(private readonly localService: OrderBasketService) {}

  @Post()
    create( @Body() createBoxDto: CreateOrderBasketDto, @Request() req){        
        return this.localService.create(createBoxDto);
      }
  
    @Get()
    async findAll(@Request() req) {
      return await this.localService.findAll(req.user.selectCompany);
    }
    @Get(":id")
    async findOne(@Request() req, @Param("id") id: string) {
      const res = await this.localService.findOne(id);
      //validateCompany (req.user.selectCompany , res.company.id);
      return res;
    }
  
    @Patch(":id")
    update(
     
      @Param("id") id: string,
      @Body() updateBoxDto: UpdateOrderBasketDto
    ) {   
      return this.localService.update(id, updateBoxDto);
    }
  
    @Delete(":id")
    async remove(@Request() req, @Param("id") id: string) {
      const res = await this.localService.findOne(id);
      //validateCompany (req.user.selectCompany , res.company.id);
      return this.localService.remove(id);
    }
}
