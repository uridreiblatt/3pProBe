import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Logger,
  Request,
  UseGuards,
} from "@nestjs/common";
import { TaskInventoryCountService } from "./task-inventory-count.service";
import { CreateTaskInventoryCountDto } from "./dto/create-task-inventory-count.dto";
import { UpdateTaskInventoryCountDto } from "./dto/update-task-inventory-count.dto";
import { ApiTags } from "@nestjs/swagger";
import { validateCompany } from "src/util/validateCompany.util";
import { AuthGuard } from "src/auth/auth.guard";
import { SKIP_COOKIE_MATCH_KEY, SkipCookieMatch } from "src/auth/entities/skip-cookie-match.decorator";

@ApiTags("Task-Inventory-Count-ok")
@SkipCookieMatch()
@UseGuards(AuthGuard)
@Controller("Task-Inventory-Count")
export class TaskInventoryCountController {
  constructor(private readonly taskInventoryCountService: TaskInventoryCountService) {}

  @Post()
  async create(
    @Body() createTaskInventoryCountDto: CreateTaskInventoryCountDto
  ) {
    return await this.taskInventoryCountService.create(createTaskInventoryCountDto);
  }

  @Get()
  @Header("Cache-Control", "max-age=0")
  async findAll(@Request() req,  @Param("id") id: string) {
    return await this.taskInventoryCountService.findAll(req.user.selectCompany, id);
  }

  @Get(":id")
  @Header("Cache-Control", "max-age=0")
  async findOne(@Request() req, @Param("id") id: string) {
    const res = await this.taskInventoryCountService.findOne(id);
    //validateCompany (req.user.selectCompany , res.user.userCompany[0].id);
    return res;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTaskInventoryCountDto: UpdateTaskInventoryCountDto
  ) {
    return await this.taskInventoryCountService.update(id, updateTaskInventoryCountDto);
  }

  @Delete(":id")
  async remove(@Request() req, @Param("id") id: string) {
    //const res = await this.taskInventoryCountService.findOne(id);
    //validateCompany (req.user.selectCompany , res.user.userCompany[0].id);
    return await this.taskInventoryCountService.remove(id);
  }
}
