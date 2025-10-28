import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { BoxesService } from "./boxes.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateBoxDto } from "./dto/create-box.dto";
import { UpdateBoxDto } from "./dto/update-box.dto";
@ApiTags("boxes")
@Controller("boxes")
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Post()
  create(@Body() createBoxDto: CreateBoxDto) {
    try {
      return this.boxesService.create(createBoxDto);
    } catch (error) {
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
    }
  }

  @Get()
  async findAll() {
    return await this.boxesService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBoxDto: UpdateBoxDto) {
    return this.boxesService.update(+id, updateBoxDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.boxesService.remove(+id);
  }
}
