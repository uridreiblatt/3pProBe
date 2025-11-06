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
@ApiTags("boxes")
@Controller("boxes")
//@UseGuards(AuthGuard)
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}
  @Post()
  create( @Body() createBoxDto: CreateBoxDto, @Request() req){
    try {     
       console.log('raw req.body', req.body);  // Should show full payload
       console.log('validated dto', createBoxDto);  
      return this.boxesService.create(createBoxDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "This is a custom message",
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        }
      );
    }
  }

  @Get()
  async findAll(@Request() req) {
    return await this.boxesService.findAll(req.user.selectCompany);
  }
  @Get(":id")
  async findOne(@Request() req, @Param("id") id: string) {
    const res = await this.boxesService.findOne(+id);
    if (req.user.selectCompany !== res.company.id) throw BadRequestException;
    return res;
  }

  @Patch(":id")
  update(
    //@Request() req,
    @Param("id") id: string,
    @Body() updateBoxDto: UpdateBoxDto
  ) {
    // if (req.user.selectCompany !== updateBoxDto.companyId) {
    //   console.error("invalid company");
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.BAD_REQUEST,
    //       error: "BAD_REQUEST",
    //     },
    //     HttpStatus.BAD_REQUEST,
    //     {
    //       cause: "invalid company id: " + updateBoxDto.companyId,
    //     }
    //   );
    // }
    return this.boxesService.update(+id, updateBoxDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.boxesService.remove(+id);
  }
}
