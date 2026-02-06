import { Injectable } from "@nestjs/common";
import { CreateOrderBoxDto } from "./dto/create-order-box.dto";
//import { UpdateOrderBoxDto } from './dto/update-order-box.dto';
import { OrderBoxes } from "./entities/order-box.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//import { Boxsize } from 'src/boxes/entities/box.entity';
//import { Order } from 'src/order/entities/order.entity';
import { UpdateOrderBoxDto } from "./dto/update-order-box.dto";
import { Order } from "../order/entities/order.entity";
import { Boxsize } from "src/maintenence/boxes/entities/box.entity";
import { OrderBoxesItems } from "../order-box-items/entities/order-box-item.entity";

@Injectable()
export class OrderBoxesService {
  constructor(
    @InjectRepository(OrderBoxes)
    private OrderBoxesRepository: Repository<OrderBoxes>,
    @InjectRepository(OrderBoxesItems)
    private OrderBoxesItemsRepository: Repository<OrderBoxesItems>
  ) {}
  async create(createOrderBoxDto: CreateOrderBoxDto) {
    console.log("createOrderBoxDto", createOrderBoxDto);
    //    delete createOrderBoxDto['id'];
    const ordB = new OrderBoxes();
    //ordB.boxNo = createOrderBoxDto.boxNo;
    ordB.boxweight = createOrderBoxDto.boxweight;
    ordB.boxSize = new Boxsize();
    ordB.boxSize.id = createOrderBoxDto.boxId;
    ordB.order = new Order();
    ordB.order.id = createOrderBoxDto.orderId;
    ordB.lineRemarks = createOrderBoxDto.lineRemarks;

    const res = await this.OrderBoxesRepository.save(ordB);
    await Promise.all(
      (createOrderBoxDto.orderBoxLines ?? []).map((obl) =>
        this.OrderBoxesItemsRepository.save(obl)
      )
    );
    return res;
  }

  async findAll(id: string) {
    return await this.OrderBoxesRepository.find({
      where: { order: { id: id } },
      relations: {
        boxSize: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.OrderBoxesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        boxSize: true,
        order: true,
      },
    });
  }

  async getOrderBoxes(id: string) {
    const res = await this.OrderBoxesRepository.find({
      where: {
        order: {
          id: id,
        },
      },
      relations: {
        boxSize: true,
      },
    });
    const resAll = res.map((ordBox) => {
      return {
        id: ordBox.id,
        boxweight: ordBox.boxweight,
        boxNo: ordBox.boxNo,
        itemsCount: ordBox.itemsCount,
        lineRemarks: ordBox.lineRemarks,
        createdAt: ordBox.createdAt,
        box: {
          id: ordBox.boxSize.id,
          sizeDesc: ordBox.boxSize.sizeDesc,
        },
      };
    });
    return resAll;
  }

  async update(id: string, updateOrderBoxDto: UpdateOrderBoxDto) {
    const { boxId, companyId, ...rest } = updateOrderBoxDto;
    console.log("updateOrderBoxDto", updateOrderBoxDto);
    const data = {
      ...rest,
      ...(boxId && { boxSize: { id: boxId } }),
    };
    const res = await this.OrderBoxesRepository.update(id, data);
    await Promise.all(
      (updateOrderBoxDto.orderBoxLines ?? []).map((obl) =>
        this.OrderBoxesItemsRepository.save(obl)
      )
    );
    return res;
  }

  async remove(id: string) {
    const olbx = await this.OrderBoxesItemsRepository.find({
      where: {
        orderBoxes: { id: id },
      },
    });
    olbx.forEach(async (ol) => {
      await this.OrderBoxesItemsRepository.delete(ol.id);
    });
    return await this.OrderBoxesRepository.delete(id);
  }
  async removeByOrderId(id: string) {
    // const olbx = await this.OrderBoxesRepository.find({
    //   where: {
    //     order: { id: id },
    //   },
    // });
    // olbx.forEach(async (ol) => {
    //   await this.OrderBoxesRepository.delete(ol.id);
    // });
    await this.OrderBoxesRepository.delete({ order: { id: id } });
  }
}
