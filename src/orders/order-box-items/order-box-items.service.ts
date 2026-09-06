import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderBoxItemDto } from './dto/create-order-box-item.dto';
import { UpdateOrderBoxItemDto } from './dto/update-order-box-item.dto';
import { OrderBoxesItems } from './entities/order-box-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderBoxes } from '../order-boxes/entities/order-box.entity';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderBoxItemsService {
  constructor(
    @InjectRepository(OrderBoxesItems)
    private OrderBoxesItemsRepository: Repository<OrderBoxesItems>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  async create(
    createOrderBoxItemDto: CreateOrderBoxItemDto,
    companyId: string,
  ) {
    const ord = this.orderRepository.findOne({
      where: {
        id: createOrderBoxItemDto.orderId,
        company: { id: companyId },
      },
    });
    if (!ord) {
      throw new NotFoundException('orderbox not found in this company');
    }
    const ins = new OrderBoxesItems();
    ins.orderBoxes = new OrderBoxes();
    ins.orderBoxes.id = createOrderBoxItemDto.orderBoxesId;
    ins.partNumber = createOrderBoxItemDto.partNumber;
    ins.productName = createOrderBoxItemDto.productName;
    ins.productDescription = createOrderBoxItemDto.productDescription;
    ins.itemsCount = createOrderBoxItemDto.itemsCount;
    ins.orderLineItemsCount = createOrderBoxItemDto.orderLineItemsCount;
    ins.orderId = createOrderBoxItemDto.orderId;
    return await this.OrderBoxesItemsRepository.save(ins);
  }

  async findAll(orderBoxId: string, companyId: string) {
    const res = await this.OrderBoxesItemsRepository.find({
      where: {
        orderBoxes: { id: orderBoxId, order: { company: { id: companyId } } },
      },
    });
    const data = await Promise.all(
      res.map(async (e) => {
        const result = await this.OrderBoxesItemsRepository.query(
          `SELECT IFNULL(SUM(obi.itemsCount), 0) AS total
       FROM order_boxes_items obi
       WHERE obi.orderId = ? AND obi.partNumber = ? and obi.id != ?`,
          [e.orderId, e.partNumber, e.id],
        );

        const collected = result[0]?.total ?? 0;

        return {
          ...e,
          collected,
        };
      }),
    );

    return data;
  }

  async findAllCompareOrderLines(orderId: string, companyId: string) {
    const ord = this.orderRepository.findOne({
      where: {
        id: orderId,
        company: { id: companyId },
      },
    });
    if (!ord) {
      throw new NotFoundException('orderbox not found in this company');
    }
    const sql =
      `  SELECT orderId,BARCODE, ` +
      ` sum(ol.TBALANCE) orderQty, ` +
      ` (select IFNULL (sum(obi.itemsCount),0) FROM order_boxes_items obi  where  ol.orderId= obi.orderId and obi.partNumber = ol.BARCODE ) as collected ` +
      ` FROM order_line ol ` +
      ` where orderId= '` +
      orderId +
      `' ` +
      ` group by orderId,BARCODE`;

    const lineDiff = await this.OrderBoxesItemsRepository.query(sql);
    return lineDiff
      .filter((e: any) => Number(e.orderQty) !== Number(e.collected))
      .map((e: any) => ({
        countStatus: 'Invalid Qty',
        partNumber: e.BARCODE,
        orderQty: Number(e.orderQty),
        collected: Number(e.collected),
      }));
  }

  async findOne(id: string, companyId: string) {
    return await this.OrderBoxesItemsRepository.findOne({
      where: { id: id, orderBoxes: { order: { company: { id: companyId } } } },
    });
  }

  async update(
    id: string,
    updateOrderBoxItemDto: UpdateOrderBoxItemDto,
    companyId: string,
  ) {
    return await this.OrderBoxesItemsRepository.update(
      { id, orderBoxes: { order: { company: { id: companyId } } } },
      updateOrderBoxItemDto,
    );
  }

  async remove(id: string, companyId: string) {
    return await this.OrderBoxesItemsRepository.delete({
      id,
      orderBoxes: { order: { company: { id: companyId } } },
    });
  }
  async removeByOrderId(orderId: string, companyId: string) {
    const ord = this.orderRepository.findOne({
      where: {
        id: orderId,
        company: { id: companyId },
      },
    });
    if (!ord) {
      throw new NotFoundException('orderbox not found in this company');
    }
    await this.OrderBoxesItemsRepository.delete({ orderId: orderId });
  }
}
