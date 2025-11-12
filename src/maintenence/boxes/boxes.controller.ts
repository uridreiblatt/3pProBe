import {
  BadRequestException,
  Request,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { BoxesService } from "./boxes.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateBoxDto } from "./dto/create-box.dto";
import { UpdateBoxDto } from "./dto/update-box.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { SkipCookieMatch } from "src/auth/entities/skip-cookie-match.decorator";
import { validateCompany } from "src/util/validateCompany.util";
@ApiTags("boxes-ok")
@Controller("boxes")
@UseGuards(AuthGuard)
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}
  @Post()
  create( @Body() createBoxDto: CreateBoxDto, @Request() req){        
      return this.boxesService.create(createBoxDto,req.user.userId);
    }

  @Get()
  async findAll(@Request() req) {
    return await this.boxesService.findAll(req.user.selectCompany);
  }
  @Get(":id")
  async findOne(@Request() req, @Param("id") id: string) {
    const res = await this.boxesService.findOne(id);
    validateCompany (req.user.selectCompany , res.company.id);
    return res;
  }

  @Patch(":id")
  update(
    //@Request() req,
    @Param("id") id: string,
    @Body() updateBoxDto: UpdateBoxDto
  ) {   
    return this.boxesService.update(+id, updateBoxDto);
  }

  @Delete(":id")
  async remove(@Request() req, @Param("id") id: string) {
    const res = await this.boxesService.findOne(id);
    validateCompany (req.user.selectCompany , res.company.id);
    return this.boxesService.remove(+id);
  }
}
