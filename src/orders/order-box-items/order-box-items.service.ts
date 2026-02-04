import { Injectable } from "@nestjs/common";
import { CreateOrderBoxItemDto } from "./dto/create-order-box-item.dto";
import { UpdateOrderBoxItemDto } from "./dto/update-order-box-item.dto";
import { OrderBoxesItems } from "./entities/order-box-item.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderBoxes } from "../order-boxes/entities/order-box.entity";

@Injectable()
export class OrderBoxItemsService {
  constructor(
    @InjectRepository(OrderBoxesItems)
    private OrderBoxesItemsRepository: Repository<OrderBoxesItems>
  ) {}
  async create(createOrderBoxItemDto: CreateOrderBoxItemDto) {
    const ins = new OrderBoxesItems();
    ins.orderBoxes = new OrderBoxes();
    ins.orderBoxes.id = createOrderBoxItemDto.orderBoxesId;
    ins.partNumber = createOrderBoxItemDto.partNumber;
    ins.productName = createOrderBoxItemDto.productName;
    ins.productDescription = createOrderBoxItemDto.productDescription;
    ins.itemsCount = createOrderBoxItemDto.itemsCount;
    ins.orderId=createOrderBoxItemDto.orderId;
    return await this.OrderBoxesItemsRepository.save(ins);
  }

  async findAll(orderId: string) {
    return await this.OrderBoxesItemsRepository.find({
      where: { orderId: orderId },
    });
  }

  async findAllCompareOrderLines(orderId: string) {
    return await this.OrderBoxesItemsRepository.find({
      where: { orderId: orderId },
    });
  }

  async findOne(id: string) {
    return await this.OrderBoxesItemsRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, updateOrderBoxItemDto: UpdateOrderBoxItemDto) {
    return await this.OrderBoxesItemsRepository.update(
      id,
      updateOrderBoxItemDto
    );
  }

  async remove(id: string) {
    return await this.OrderBoxesItemsRepository.delete(id);
  }
  async removeByOrderId(orderId: string) {
    await this.OrderBoxesItemsRepository.delete({ orderId: orderId });
  }
}
